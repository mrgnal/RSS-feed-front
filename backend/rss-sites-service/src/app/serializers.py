from rest_framework import serializers
from .models import RssChanel

class RssSerializer(serializers.ModelSerializer):
    class Meta:
        model = RssChanel
        fields = ['id', 'title', 'description', 'url', 'status', 'user_id']
