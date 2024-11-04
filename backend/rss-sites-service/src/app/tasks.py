from celery import shared_task
from django.utils import timezone
from .models import *
from datetime import timedelta
import json


# @shared_task
# def check_rss_feeds():
#     current_time = timezone.now()
#
#     rss_to_check = RssModel.objects.filter(last_checked__lte=current_time - timedelta(minutes=models.F('frequency_request')))
#     for rss in rss_to_check:
#         send_rss_reminder.apply_async(args=[rss.id])
#         rss.last_checked = current_time
#         rss.save()


# def send_rss_reminder():
#     producer = KafkaProducer(
#         bootstrap_servers = ['localhost:9093'],
#         value_serializer = lambda v: json.dumps(v).encode('utf-8')
#     )
#
#     message = {
#         'action':'rss_reminders',
#         'details': 'Check rss'
#     }
#
#     producer.send('rss_reminders', value= message)
#     producer.flush()
#     print('Rss remind')
