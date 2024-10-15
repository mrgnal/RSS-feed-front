from abc import ABC, abstractmethod
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class AuthServiceBase(ABC):
    @abstractmethod
    def register(self, data: dict) -> User:
        """Реєструє користувача"""
        pass

    @abstractmethod
    def authenticate(self, data: dict) -> dict:
        """Аутентифікує користувача"""
        pass
