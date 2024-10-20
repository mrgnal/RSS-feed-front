from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from .models import User
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = super().create(validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
class UserDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = []