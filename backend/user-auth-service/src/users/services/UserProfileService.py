import os
from django.urls import reverse
from django.utils.translation import gettext as _
from rest_framework import status
from rest_framework.exceptions import ValidationError
import requests
from .AuthService import AuthService


class UserProfileService:
    def __init__(self, user):
        self.user = user

    def update_user_data(self, data: dict, token, request) -> dict:
        username = data.get('username')
        email = data.get('email')

        if username:
            self.user.username = username
        if email:
            self.user.email = email
            self.user.is_email_verified = False
            auth_service = AuthService()
            auth_service.activateEmail(request, self.user, email)
        self.user.save()
        if 'new_password' in data and 'old_password' in data and data['new_password'] != data['old_password']:
            BASE_DOMAIN = os.getenv('BASE_DOMAIN')
            USE_HTTPS = os.getenv('USE_HTTPS')
            base_url = f"{'https' if USE_HTTPS is True else 'http'}://{BASE_DOMAIN}"
            change_password_url = f"{base_url}{reverse('change_password')}"
            headers = {
                'Authorization': f'Bearer {token}'
            }
            user_data = {
                'old_password': data['old_password'],
                'new_password': data['new_password'],
            }
            change_password_response = requests.post(change_password_url, data=user_data, headers=headers)
            print(change_password_response)

        return {
            "status_code": status.HTTP_200_OK,
            "message": _("User data updated successfully."),
            "username": self.user.username,
            "email": self.user.email,
        }

    def delete_profile(self) -> dict:
        user_id = self.user.id
        self.user.delete()
        return {
            "status_code": status.HTTP_204_NO_CONTENT,
            "message": _("User profile deleted successfully."),
            "user_id": user_id,
        }
