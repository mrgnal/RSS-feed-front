from django.db import models
from django.utils.timezone import now


class SubscriptionType(models.Model):
    type = models.CharField('Type', max_length=100)
    price = models.FloatField(default=0)
    expire_time = models.IntegerField(default=30, help_text='Expiration time in days')
    max_feeds = models.IntegerField(default=0, help_text='Maximum number of feeds')
    max_rss = models.IntegerField(default=0, help_text='Maximum number of RSS sources')

    def __str__(self):
        return f"{self.type} - ${self.price}"


class Subscription(models.Model):
    subscription_type = models.ForeignKey(
        SubscriptionType, on_delete=models.CASCADE, related_name='subscriptions'
    )
    beginning_date = models.DateTimeField(default=now)
    end_date = models.DateTimeField(null=True, blank=True)
    user_id = models.IntegerField()

    def __str__(self):
        return f"Subscription for {self.subscription_type.type} from {self.beginning_date}"
