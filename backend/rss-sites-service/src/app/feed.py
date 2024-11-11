import requests
from rest_framework.response import Response
import os
from dotenv import load_dotenv

load_dotenv()

RSS_URL = os.getenv('RSS_URL')

FEED_URL = "http://" + RSS_URL + '/api/feed/'
BUILDER_URL = "http://" + RSS_URL + '/api/builder/'

PAYMENT_HISTORY_URL = os.getenv('PAYMENT_HISTORY_URL')

LIMITS_URL = "http://" + PAYMENT_HISTORY_URL + "/api/subscriptions/current/limits"

def create_feed(channel_id, data):
    if data['type'] == 'generator':
        payload = {
            'url': data['url'],
            'channel_id': str(channel_id),
            'articles': data['articles'],
        }
        post_url = FEED_URL
    else:
        payload = {
            'url': data['url'],
            'channel_id': str(channel_id),
            'elements': data['elements'],
        }
        post_url = BUILDER_URL

    try:
        response = requests.post(post_url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return Response(status=404)

def delete_feed(channel_id):
    delete_url = FEED_URL
    try:
        response = requests.delete(f"{delete_url}?channel_id={channel_id}")
        response.raise_for_status()
        return Response(status=204)
    except requests.exceptions.RequestException as e:
        return Response(status=404)

def max_feeds(request):
    limit_url = LIMITS_URL
    try:
        response = requests.get(headers=request.headers, url=limit_url)
        response.raise_for_status()
        return response.json().get('max_feeds')
    except requests.exceptions.RequestException as e:
        return Response(status=404)