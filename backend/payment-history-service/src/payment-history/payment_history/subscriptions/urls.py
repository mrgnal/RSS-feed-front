from django.urls import path
from .views import UserSubscriptionHistoryView, UserCurrentSubscriptionView, CreateSubscriptionView

urlpatterns = [
    path('subscriptions/history/', UserSubscriptionHistoryView.as_view(), name='subscription-history'),
    path('subscriptions/current/', UserCurrentSubscriptionView.as_view(), name='current-subscription'),
    path('subscriptions/', CreateSubscriptionView.as_view(), name='create_subscription'),
]
