from rest_framework.views import APIView
from rest_framework.response import Response
from .services.AuthService import AuthService
from .services.GoogleAuthService import GoogleAuthService
from rest_framework import status
from django.conf import settings
from google.auth.transport import requests as google_requests
import requests


class AuthViewBase(APIView):
    auth_service_class = AuthService

    def get_auth_service(self):
        return self.auth_service_class()


class RegisterView(AuthViewBase):
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.register(request.data)
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
            result = auth_service.authenticate(data={'token':   access_token})

            if result['status_code'] == status.HTTP_200_OK:
                return Response(result['data'])
            else:
                return Response(result, status=result['status_code'])

        return Response({
            "error": "Failed to exchange code for token",
            "details": token_response.json()
        }, status=token_response.status_code)
