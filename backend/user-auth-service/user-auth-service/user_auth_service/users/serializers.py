# users/serializers.py

from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from .models import User
from django.contrib.auth.models import Group


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = super().create(validated_data)
        return user
