from confluent_kafka import Producer
import json
from .models import RssChannel
from dotenv import load_dotenv
import os

load_dotenv()

KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_PORT = os.getenv('KAFKA_PORT')
KAFKA_TOPIC = os.getenv('KAFKA_TOPIC_UPDATE_FEED')

producer_config = {
    'bootstrap.servers': f'{KAFKA_HOST}:]{KAFKA_PORT}',
    'client.id': 'drf-service'
}

producer = Producer(producer_config)

def send_rss_channels_to_kafka():
    channels = RssChannel.objects.filter(status=True)
    for channel in channels:
        message = {
            'id': str(channel.id),
            'url': channel.url,
            'updated': channel.updated,
        }
        producer.produce(f'{KAFKA_TOPIC}', key=str(channel.id), value=json.dumps(message))
        producer.flush()