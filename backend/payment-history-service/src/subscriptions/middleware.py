import requests
from dotenv import load_dotenv
from django.http import JsonResponse
from rest_framework import status
import os
import re

load_dotenv()

AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL')


def verify_token(token):
    response = requests.post(
        f"{AUTH_SERVICE_URL}/api/verify_token/",
        headers={"Authorization": f"Bearer {token}"},
        json={"token": token}
    )
    print('info: ', response.json())
    return response.json() if response.status_code == 200 else None


EXEMPT_PATHS = [
    '/api/subscription-types/',
    r'^/api/subscription-types/\d+/$',
    '/swagger/',
    '/admin/',
]


class TokenVerificationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(request.path)
        if any(re.match(pattern, request.path) for pattern in EXEMPT_PATHS):
            return self.get_response(request)
        if request.path in EXEMPT_PATHS:
            return self.get_response(request)
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            user_info = verify_token(token.split(' ')[1])
            if not user_info:
                return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                request.user_info = user_info
            print(request.user_info)
            response = self.get_response(request)
            return response
        else:
            return JsonResponse({'error': 'No token'}, status=status.HTTP_401_UNAUTHORIZED)
