from confluent_kafka import Consumer, KafkaException, KafkaError
import json
import copy
import feed as fd
import asyncio
from producer import send_updates_to_kafka
from db.database import SessionLocal
from db.rss_models import RSSFeed
from dotenv import load_dotenv
import os
load_dotenv()

KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_PORT = os.getenv('KAFKA_PORT')
KAFKA_TOPIC = os.getenv('KAFKA_TOPIC_UPDATE_FEED')

consumer_config = {
    'bootstrap.servers': f'{KAFKA_HOST}:{KAFKA_PORT}',
    'group.id': 'fastapi-service-group',
    'auto.offset.reset': 'earliest',
}

consumer = Consumer(consumer_config)

async def consume_rss_channels():
    consumer.subscribe([f'{KAFKA_TOPIC}'])

    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                await asyncio.sleep(0.1)
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    print(f"End of partition reached {msg.partition}")
                else:
                    raise KafkaException(msg.error())
            else:
                data = json.loads(msg.value().decode('utf-8'))
                await check_update(data)

    except asyncio.CancelledError:
        pass
    finally:
        consumer.close()

def close_consumer():
    consumer.close()

async def check_update(data):
    url = data['url']
    parsed_data = fd.parse(url)
    source = fd.get_source(parsed_data)
    updated = source.get('updated')
    channel_id = data['id']
    new_articles = fd.get_articles(parsed_data)

    db = SessionLocal()
    try:
        feed = db.query(RSSFeed).filter(RSSFeed.channel_id == channel_id).first()
        if feed:
            old_articles = feed.articles

            clear_new_articles = copy.deepcopy(new_articles)
            fd.delete_field('collection_id', clear_new_articles)

            clear_old_articles = copy.deepcopy(old_articles)
            fd.delete_field('collection_id', clear_old_articles)

            if  clear_new_articles != clear_old_articles:
                feed.articles = new_articles
                db.commit()
                db.refresh(feed)
                await send_updates_to_kafka(channel_id, updated)
    finally:
        db.close()