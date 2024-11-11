from rest_framework import serializers
from .models import RssChannel

class RssChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RssChannel
        fields = '__all__'
