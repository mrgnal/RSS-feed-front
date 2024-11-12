import json
from confluent_kafka import Consumer, KafkaError, KafkaException
from .models import RssChannel
from dotenv import load_dotenv
import os

load_dotenv()

KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_PORT = os.getenv('KAFKA_PORT')
KAFKA_TOPIC = os.getenv('KAFKA_TOPIC_UPDATE_CHANNEL')
consumer_config = {
    'bootstrap.servers': f'{KAFKA_HOST}:{KAFKA_PORT}',
    'group.id': 'fastapi-service-group',
    'auto.offset.reset': 'earliest',
}

consumer = Consumer(consumer_config)

def consume_feed():
    consumer.subscribe([f'{KAFKA_TOPIC}'])

    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    print(f"End of partition reached {msg.partition}")
                else:
                    raise KafkaException(msg.error())
            else:
                data = json.loads(msg.value().decode('utf-8'))
                update_channel(data)


    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()

def update_channel(data):
    try:
        channel_id = data.get('channel_id')
        channel = RssChannel.objects.filter(id=channel_id).first()

        if channel:
            channel.updated = data.get('updated')
            channel.is_new = data.get('is_new')
            channel.save()
    except Exception as e:
        print(f"Error updating channel: {e}")