import requests
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

AUTH_URL = 'http://172.28.0.20/api/verify_token/'


class ExternalAuthServiceAuthentication(BaseAuthentication):
    def authenticate(self, request):

        token = request.headers.get('accessToken')

        if not token:
            raise AuthenticationFailed('Authorization token is missing')

        user_info = self.verify_token(token)

        if not user_info:
            raise AuthenticationFailed(f'Invalid token.')

        return (user_info.get('user_info'), token)

    def verify_token(self,token):
        url = AUTH_URL
        response = requests.post(url=url, json={"token": token})

        return response.json()