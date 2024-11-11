from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
import asyncio
import json

KAFKA_SERVER = None

async def send_kafka_message(topic, message):
    producer = AIOKafkaProducer(bootstrap_servers=KAFKA_SERVER)
    await producer.start()
    try:
        await producer.send_and_wait(topic, message.encode('utf-8'))
    finally:
        await producer.stop()

async def consumer_message(topic, group, process_message):
    consumer = AIOKafkaConsumer(topic, bootstrap_servers=KAFKA_SERVER, group_id=group)
    await consumer.start()
    try:
        async for msg in consumer:
            message_str = msg.value.decode('utf-8')
            data = json.loads(message_str)

            process_message(data)
    finally:
        consumer.stop()

