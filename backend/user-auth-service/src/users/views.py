import os

import rest_framework_simplejwt
from django.http import HttpResponseRedirect
from urllib.parse import urlencode
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .services.AccountActivationTokenGenerator import account_activation_token
from .services.AuthService import AuthService
from .services.GoogleAuthService import GoogleAuthService
from rest_framework import status
from django.conf import settings
import requests
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.contrib import messages
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ChangePasswordSerializer, UserUpdateSerializer, UserCreateSerializer, UserDeleteSerializer
from .services.PasswordChangeService import PasswordChangeService
from rest_framework import generics, permissions
from .services.UserProfileService import UserProfileService
from .services.SendEmailService import SendEmailService
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.tokens import UntypedToken, RefreshToken
from rest_framework.generics import GenericAPIView
from rest_framework import serializers
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class AuthViewBase(GenericAPIView):
    auth_service_class = AuthService

    def get_auth_service(self):
        return self.auth_service_class()


class RegisterView(AuthViewBase):
    class RegisterSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        password = serializers.CharField(required=True, max_length=128, write_only=True)
        username = serializers.CharField(max_length=50, required=True)
        role = serializers.CharField(required=True)
        is_email_verified = serializers.BooleanField(required=True)

    serializer_class = RegisterSerializer

    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.register(request.data, request)
        return Response(result, status=result['status_code'])


class LoginView(AuthViewBase):
    class AuthSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        password = serializers.CharField(required=True, max_length=128, write_only=True)
    serializer_class = AuthSerializer

    @swagger_auto_schema(
        request_body=AuthSerializer,
        responses={
            200: 'Successful login',
            401: 'Unauthorized',
            400: 'Bad request',
        }
    )
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.authenticate(request.data)
        if result['status_code'] == status.HTTP_200_OK:
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=result['status_code'])


class RefreshView(AuthViewBase):
    class TokenSerializer(serializers.Serializer):
        refresh_token = serializers.CharField(required=True)
    serializer_class = TokenSerializer

    @swagger_auto_schema(
        request_body=TokenSerializer,
        responses={
            200: 'Successful login',
            401: 'Unauthorized',
            400: 'Bad request',
        }
    )
    def post(self, request):
        serializer = self.TokenSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data['refresh_token']
            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = str(refresh.access_token)

                return Response(
                    {
                        "access_token": new_access_token,
                        "refresh_token": str(refresh)
                    },
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                return Response({"detail": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthInitView(APIView):
    @swagger_auto_schema(
        responses={
            200: openapi.Response(
                description="URL для авторизації через Google",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'url': openapi.Schema(type=openapi.TYPE_STRING,
                                              example="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={settings.GOOGLE_CLIENT_ID}&redirect_uri={settings.GOOGLE_REDIRECT_URI}&scope=email profile"),
                    }
                )
            ),
        },
    )
    def get(self, request):
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={settings.GOOGLE_CLIENT_ID}&redirect_uri={settings.GOOGLE_REDIRECT_URI}&scope=email profile"
        return Response({"auth_url": auth_url})


class GoogleAuthCallbackView(APIView):
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return Response({"error": "No code provided"}, status=status.HTTP_400_BAD_REQUEST)
        print(code)
        token_data = {
            'code': code,
            'client_id': settings.GOOGLE_CLIENT_ID,
            'client_secret': settings.GOOGLE_CLIENT_SECRET,
            'redirect_uri': settings.GOOGLE_REDIRECT_URI,
            'grant_type': 'authorization_code'
        }

        token_url = 'https://oauth2.googleapis.com/token'
        token_response = requests.post(token_url, data=token_data)

        if token_response.status_code == 200:
            access_token = token_response.json().get('access_token')
            auth_service = GoogleAuthService()
            result = auth_service.authenticate(data={'token': access_token})

            if result['status_code'] == status.HTTP_200_OK:
                url = f"{os.getenv('HOME_PAGE_URL')}?{urlencode(result['data'])}"
                return HttpResponseRedirect(url)
            else:
                return Response(result, status=result['status_code'])

        return Response({
            "error": "Failed to exchange code for token",
            "details": token_response.json()
        }, status=token_response.status_code)


def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None
    HOME_PAGE_URL = os.getenv('HOME_PAGE_URL')
    if user is not None and account_activation_token.check_token(user, token):
        user.is_email_verified = True
        user.save()
        messages.success(request, "Thank you for your email confirmation. Now you can login your account.")

        return redirect(HOME_PAGE_URL)
    else:
        messages.error(request, "Activation link is invalid!")

    return redirect(HOME_PAGE_URL)


@swagger_auto_schema(
        method='post',
        request_body=ChangePasswordSerializer,
        responses={
            200: 'Password changed successfully.',
            400: 'Incorrect old password.'
        }
    )
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        old_password = serializer.data.get('old_password')
        new_password = serializer.data.get('new_password')
        return PasswordChangeService.change_user_password(request.user, old_password, new_password, request)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class UserProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    class UpdateSerializer(serializers.Serializer):
        email = serializers.EmailField(required=False)
        username = serializers.CharField(max_length=50, required=False)
        old_password = serializers.CharField(required=False)
        new_password = serializers.CharField(required=False)

    serializer_class = UpdateSerializer
    @swagger_auto_schema(
        request_body=UpdateSerializer,

    )
    def update(self, request: Request, *args, **kwargs):
        service = UserProfileService(request.user)
        data = request.data
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1] if 'HTTP_AUTHORIZATION' in request.META else None
        return Response(service.update_user_data(data, token, request))


@permission_classes([IsAuthenticated])
class UserProfileDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            204: 'Profile deleted successfully',
            401: 'Unauthorized',
        },
        security=[{'BearerAuth': []}]
    )

    def destroy(self, request: Request, *args, **kwargs):
        service = UserProfileService(request.user)
        return Response(service.delete_profile())


class SendEmailView(APIView):
    class SendEmailSerializer(serializers.Serializer):
        to_email = serializers.EmailField(required=True)
        email_subject = serializers.CharField(max_length=50, required=True)
        message = serializers.CharField(required=True)

    @swagger_auto_schema(
        request_body=SendEmailSerializer,
        responses={
            200: 'email sent successfully',
            400: 'email_subject, message, and to_email are required.'
        }
    )
    def post(self, request):
        email_subject = request.data.get('email_subject')
        message = request.data.get('message')
        to_email = request.data.get('to_email')

        if not email_subject or not message or not to_email:
            return Response(
                {'error': 'email_subject, message, and to_email are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        mailing_service = SendEmailService()
        result = mailing_service.send_message(email_subject, message, to_email)

        return Response(result, status=result.get('status', status.HTTP_500_INTERNAL_SERVER_ERROR))


class CustomTokenVerifyView(TokenVerifyView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'id': openapi.Schema(type=openapi.TYPE_STRING, description='User ID'),
                    'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                    'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                },
            ),
        }
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            token = request.data.get('token', None)
            if token:
                validated_token = UntypedToken(token)
                user_id = validated_token['user_id']
                try:
                    user = User.objects.get(id=user_id)
                    user_info = {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                    }
                    response.data['user_info'] = user_info
                except User.DoesNotExist:
                    response.data['user_info'] = None

        return response
