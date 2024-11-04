from django.urls import path, include
from .views import *

urlpatterns = [
    path('api/rss-channel/', RssChannelAPI.as_view(), name='rss-channel')
]