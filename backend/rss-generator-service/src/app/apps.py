from django.apps import AppConfig
import threading
from .consumer.consumer import start_consumer

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

    def ready(self):
        start_consumer()
