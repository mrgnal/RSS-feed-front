from confluent_kafka import Consumer, KafkaException, KafkaError
import json
import feed
from producer import send_updates_to_kafka
from fastapi import Depends
from sqlalchemy.orm import Session
from db.rss_models import RSSFeed
from db.database import get_db
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

def consume_rss_channels():
    consumer.subscribe([f'{KAFKA_TOPIC}'])

    try:
        while True:
            msg = consumer.poll(1.0)  # Чекаємо повідомлення
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    print(f"End of partition reached {msg.partition}")
                else:
                    raise KafkaException(msg.error())
            else:
                data = json.loads(msg.value().decode('utf-8'))
                check_update(data)

    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()

def check_update(data):
    url = data['url']
    parsed_data = feed.parse(url)
    source = feed.get_source(parsed_data)
    updated = source.get('updated')
    channel_id = data['id']

    if updated != data['updated']:
        articles = feed.get_articles(parsed_data)
        update_feed(channel_id,articles)
        send_updates_to_kafka(channel_id, updated)

def update_feed(channel_id: str, articles,db : Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.channel_id == channel_id).first()
    if feed:
        feed.articles = articles
        db.commit()
        db.refresh(feed)
