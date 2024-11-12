from confluent_kafka import Producer
import json
from dotenv import load_dotenv
import os
load_dotenv()

KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_PORT = os.getenv('KAFKA_PORT')
KAFKA_TOPIC = os.getenv('KAFKA_TOPIC_UPDATE_CHANNEL')

producer = Producer({
    'bootstrap.servers': f'{KAFKA_HOST}:{KAFKA_PORT}',
    'client.id': 'fastapi-service'
})

def send_updates_to_kafka(channel_id, updated):
    message = {
        'channel_id': channel_id,
        'updated': updated,
        'is_new': True
    }
    producer.produce(f'{KAFKA_TOPIC}', key=str(channel_id), value=json.dumps(message))
    producer.flush()