import os

from django.conf import settings
from django.contrib.auth.models import User
from google.oauth2 import id_token
import requests
from rest_framework import status
from .abstracts.auth_base import AuthServiceBase
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse


class GoogleAuthService(AuthServiceBase):
    def authenticate(self, data: dict) -> dict:
        try:
            token = data['token']
            userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
            response = requests.get(
                userinfo_url,
                params={'access_token': token}
            )
            idinfo = response.json()

            email = idinfo['email']
            username = idinfo.get('name', email)
            user_data = {
                'email': email,
                'username': username,
                'password': idinfo['id']+'RSs!',
                'is_email_verified': True,
                'role': 'client',
            }

            BASE_DOMAIN = os.getenv('BASE_DOMAIN')
            USE_HTTPS = os.getenv('USE_HTTPS')
            print(USE_HTTPS)
            base_url = f"{'https' if USE_HTTPS is True else 'http'}://{BASE_DOMAIN}"
            print(base_url)
            register_url = f"{base_url}{reverse('register')}"
            login_url = f"{base_url}{reverse('login')}"
            user_data['user_data'] = True
            register_response = requests.post(register_url, data=user_data)
            if register_response.status_code in [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST]:
                login_data = {
                    'email': email,
                    'password': user_data['password']
                }
                login_response = requests.post(login_url, data=login_data)

                if login_response.status_code == status.HTTP_200_OK:
                    return {
                        "status_code": status.HTTP_200_OK,
                        "data": login_response.json()
                    }
                else:
                    return {
                        "status_code": status.HTTP_400_BAD_REQUEST,
                        "errors": login_response.json()
                    }
            else:
                return {
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "message": "Failed to register or login user"
                }

        except ValueError:
            return {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid token"
            }
        except Exception as e:
            return {
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            }

    def register(self, data: dict) -> User:
        pass
