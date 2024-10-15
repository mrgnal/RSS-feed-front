from urllib.request import Request
from django.contrib.auth.models import User, Group
from user_auth_service.users.models import User
from user_auth_service.users.services.abstracts.auth_base import AuthServiceBase
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from djoser.serializers import UserCreateSerializer

class AuthService(AuthServiceBase):

    def authenticate(self, data: dict) -> dict:
        email = data.get('email')
        password = data.get('password')
        user = User.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            request = Request(self)
            request.data['email'] = email
            request.data['password'] = password
            token_view = TokenObtainPairView.as_view()
            response = token_view(request)
            if response.status_code == status.HTTP_200_OK:
                token_data = response.data
                return {
                    "status_code": status.HTTP_200_OK,
                    "access": token_data['access'],
                    "refresh": token_data['refresh'],
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
        if serializer.is_valid():
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
