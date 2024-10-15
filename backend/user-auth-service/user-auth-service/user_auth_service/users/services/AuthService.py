from urllib.request import Request
from django.contrib.auth.models import Group
from ..models import User
from ..services.abstracts.auth_base import AuthServiceBase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserCreateSerializer


class AuthService(AuthServiceBase):

    def authenticate(self, data: dict) -> dict:
        email = data.get('email')
        password = data.get('password')
        user = User.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return {
                "status_code": status.HTTP_200_OK,
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user_id": user.id,
                "username": user.username,
                "groups": [group.name for group in user.groups.all()]
            }
        return {
            "status_code": status.HTTP_401_UNAUTHORIZED,
            "message": "Invalid email or password."
        }

    def register(self, data: dict) -> dict:
        serializer = UserCreateSerializer(data=data)
        if serializer.is_valid() and data.get('role') is not None:
            user = serializer.save()

            role = data.get('role')

            if role:
                group, created = Group.objects.get_or_create(name=role)
                user.groups.add(group)

            return {
                "status_code": status.HTTP_201_CREATED,
                "message": "User registered successfully.",
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
                "role": role,
            }

        return {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "errors": serializer.errors
        }
