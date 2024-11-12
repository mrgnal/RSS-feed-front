from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from .producer import send_rss_channels_to_kafka

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.start()
    scheduler.add_job(
        send_rss_channels_to_kafka,
        IntervalTrigger(minutes=15),
    )