from django.test import TestCase, Client
from django.urls import reverse, resolve
import json


class TestViewsApi(TestCase):
    def set_up(self):
        self.client = Client()

    def test_register_view(self):
        response = self.client.post(reverse('register'), {
            'email': 'unittest@gmail.com',
            'password': 'testPassword123',
            'role': 'client',
            'username': 'unit test user',
        })
        self.assertEqual(response.status_code, 201)

    def test_register_with_no_email_view(self):
        response = self.client.post(reverse('register'), {
            'password': 'testPassword123',
            'role': 'client',
            'username': 'unit test user',
        })
        print(response.status_code)
        self.assertEqual(response.status_code, 400)

    def test_auth_view(self):
        self.client.post(reverse('register'), {
            'email': 'unittest@gmail.com',
            'password': 'testPassword123',
            'role': 'client',
            'username': 'unit test user',
        })
        response = self.client.post(reverse('login'), {
            'email': 'unittest@gmail.com',
            'password': 'testPassword123',
        })
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('access_token', response_data)
        self.assertIn('refresh_token', response_data)
        self.assertIsNotNone(response_data['access_token'])
        self.assertIsNotNone(response_data['refresh_token'])
