import os

from rest_framework.views import APIView
from rest_framework.response import Response

from .services.AccountActivationTokenGenerator import account_activation_token
from .services.AuthService import AuthService
from .services.GoogleAuthService import GoogleAuthService
from rest_framework import status
from django.conf import settings
import requests
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.contrib import messages


class AuthViewBase(APIView):
    auth_service_class = AuthService

    def get_auth_service(self):
        return self.auth_service_class()


class RegisterView(AuthViewBase):
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.register(request.data, request)
        return Response(result, status=result['status_code'])


class LoginView(AuthViewBase):
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.authenticate(request.data)
        return Response(result, status=result['status_code'])


class GoogleAuthInitView(APIView):
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
                return Response(result['data'])
            else:
                return Response(result, status=result['status_code'])

        return Response({
            "error": "Failed to exchange code for token",
            "details": token_response.json()
        }, status=token_response.status_code)


def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = int(force_str(urlsafe_base64_decode(uidb64)))
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
