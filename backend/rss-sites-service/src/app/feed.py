import requests
from rest_framework.response import Response
import os
from dotenv import load_dotenv

load_dotenv()

RSS_URL = os.getenv('RSS_URL')

FEED_URL = "http://" + RSS_URL + '/api/feed/'
BUILDER_URL = "http://" + RSS_URL + '/api/builder/'

def create_feed(channel_id, data):
    if data['type'] == 'generator':
        payload = {
            'url': data['source'].get('url'),
            'channel_id': str(channel_id),
            'articles': data['articles'],
        }
        post_url = FEED_URL
    else:
        payload = {
            'url': data['source'].get('url'),
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
        response = requests.delete(delete_url+channel_id)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return Response(status=404)
