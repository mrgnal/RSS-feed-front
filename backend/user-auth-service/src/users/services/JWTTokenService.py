import jwt
from datetime import datetime, timedelta
from django.conf import settings

from .abstracts.token_base import TokenServiceBase


class JWTTokenService(TokenServiceBase):
    def generate_token(self, user) -> str:
        """Генерує JWT для користувача"""
        payload = {
            'id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=1),
            'iat': datetime.utcnow(),
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
