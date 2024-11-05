import os
from urllib.request import Request
from django.contrib.auth.models import Group
from ..models import User
from ..services.abstracts.auth_base import AuthServiceBase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserCreateSerializer
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from .AccountActivationTokenGenerator import account_activation_token
from django.contrib import messages


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

    def register(self, data: dict, request=None) -> dict:
        serializer = UserCreateSerializer(data=data)
        if serializer.is_valid() and data.get('role') is not None:
            user = serializer.save()

            role = data.get('role')

            if role:
                group, created = Group.objects.get_or_create(name=role)
                user.groups.add(group)

            if user.is_email_verified is False:
                self.activateEmail(request, user, user.email)

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

    def activateEmail(self, request, user, to_email):
        mail_subject = "Activate your user account."
        BASE_DOMAIN = os.getenv('BASE_DOMAIN')
        message = render_to_string("email_confirmation_template.html", {
            'user': user.username,
            'domain': BASE_DOMAIN,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
            'protocol': 'https' if request.is_secure() else 'http',
        })
        email = EmailMessage(mail_subject, message, to=[to_email])
        if email.send():
            messages.success(request, f'Dear <b>{user}</b>, please go to you email <b› (to_email)</b> inbox and click on \
        received activation link to confirm and complete the registration. <b›Note:</b> Check your spam folder. ')
        else:
            messages.error(request, f'Problem sending email to (to_email), check if you typed it correcty.')