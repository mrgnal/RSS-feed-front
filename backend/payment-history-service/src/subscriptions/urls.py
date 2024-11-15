from django.urls import path
from .views import UserSubscriptionHistoryView, UserCurrentSubscriptionView, CreateSubscriptionView, \
    AllSubscriptionTypesView, SubscriptionTypeByIdView, AdminSubscriptionView, AdminSubscriptionTypeView

urlpatterns = [
    path('subscriptions/history/', UserSubscriptionHistoryView.as_view(), name='subscription-history'),
    path('subscriptions/current/', UserCurrentSubscriptionView.as_view(), name='current-subscription'),
    path('subscriptions/', CreateSubscriptionView.as_view(), name='create_subscription'),
    path('subscription-types/', AllSubscriptionTypesView.as_view(), name='subscription-types'),
    path('subscription-types/<id>/', SubscriptionTypeByIdView.as_view(), name='subscription-type-detail'),
    path('subscriptions/admin/', AdminSubscriptionView.as_view(), name='admin_subscriptions'),
    path('subscription-types/admin/', AdminSubscriptionTypeView.as_view(), name='admin_subscription_types'),
]
