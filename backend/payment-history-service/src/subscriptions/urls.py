from django.urls import path
from .views import UserSubscriptionHistoryView, UserCurrentSubscriptionView, CreateSubscriptionView, \
    AllSubscriptionTypesView, SubscriptionTypeByIdView, UserLimitsView

urlpatterns = [
    path('subscriptions/history/', UserSubscriptionHistoryView.as_view(), name='subscription-history'),
    path('subscriptions/current/', UserCurrentSubscriptionView.as_view(), name='current-subscription'),
    path('subscriptions/current/limits', UserLimitsView.as_view(), name='current-subscription-limits'),
    path('subscriptions/', CreateSubscriptionView.as_view(), name='create_subscription'),
    path('subscription-types/', AllSubscriptionTypesView.as_view(), name='subscription-types'),
    path('subscription-types/<id>/', SubscriptionTypeByIdView.as_view(), name='subscription-type-detail'),
]
