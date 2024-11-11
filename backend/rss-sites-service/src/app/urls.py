from django.urls import path, include
from .views import RssChannelAPIView,RssChannelSourseAPIView

urlpatterns =[
    path('channel/', RssChannelAPIView.as_view()),
    path('channel/create', RssChannelAPIView.as_view()),
    path('channel/<uuid:pk>/update', RssChannelAPIView.as_view()),
    path('channel/<uuid:pk>/delete', RssChannelAPIView.as_view()),
    path('channel/<uuid:pk>/source', RssChannelSourseAPIView.as_view()),
]