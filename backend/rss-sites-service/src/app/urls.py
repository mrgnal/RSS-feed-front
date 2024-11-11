from django.urls import path, include
from .views import RssChannelCountAPIView, RssChannelAPIView,RssChannelSourseAPIView

urlpatterns =[
    path('channel/', RssChannelAPIView.as_view()),
    path('channel/create', RssChannelAPIView.as_view()),
    path('channel/<uuid:pk>/update', RssChannelAPIView.as_view()),
    path('channel/<uuid:pk>/delete', RssChannelAPIView.as_view()),

    path('channel/source', RssChannelSourseAPIView.as_view()),
    path('channel/count', RssChannelCountAPIView.as_view()),
]