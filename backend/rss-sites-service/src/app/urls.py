from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# router = DefaultRouter()
# router.register(r'rss', RssViewSet)
#
# urlpatterns = [
#     path('', include(router.urls)),
# ]
#

urlpatterns =[
    # path('api/events/', EventAPIView.as_view(), name='event-api')
]