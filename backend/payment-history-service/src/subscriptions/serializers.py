from rest_framework import serializers
from .models import Subscription,SubscriptionType


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'subscription_type_id', 'beginning_date', 'end_date']


class SubscriptionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = ['id', 'type', 'price', 'expire_time', 'expire_time', 'max_feeds', 'max_feeds', 'max_rss']
