import requests
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from dotenv import load_dotenv
import os

load_dotenv()

USER_AUTH_URL = os.getenv('USER_AUTH_URL')
VERIFY_TOKEN_URL ='http://' + USER_AUTH_URL + '/api/verify_token/'

class ExternalAuthServiceAuthentication(BaseAuthentication):
    def authenticate(self, request):

        token = request.headers.get('Authorization')
        if not token:
            raise AuthenticationFailed('Authorization token is missing')
        token = token.split(' ')[1]

        user_info = self.verify_token(token)

        if not user_info:
            raise AuthenticationFailed(f'Invalid token.')

        return (user_info.get('user_info'), token)

    def verify_token(self,token):
        url = VERIFY_TOKEN_URL
        response = requests.post(url=url, json={"token": token})

        return response.json()