from threading import Thread
from confluent_kafka import Consumer
from ..feed import *
from dotenv import load_dotenv
load_dotenv()


def consumer_message():
    consumer_conf = {
        'bootstrap.servers': 'kafka:9092',
        'group.id': 'rss_consumer_group',
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(consumer_conf)

    consumer.subscribe(['check_rss_chanel'])

    try:
        while True:
            msg = consumer.poll(1.0)  # Очікуємо повідомлення 1 секунду

            if msg is None:
                continue  # Якщо повідомлення відсутнє, чекаємо далі

            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue

            # Отримуємо дані повідомлення
            message_value = json.loads(msg.value().decode('utf-8'))
            url = message_value.get('url')

            # Викликаємо функцію для обробки URL
            test(url)
            print("Ok")

    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()

def start_consumer():
    thread = Thread(target=consumer_message)
    thread.start()
