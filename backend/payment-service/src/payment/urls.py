from django.urls import path
from .views import PaymentView, PaymentExecuteView, UserPaymentsView

urlpatterns = [
    path(
        'payments/create/',
        PaymentView.as_view(),
        name='payment-create'
    ),

    path('payments/execute/', PaymentExecuteView.as_view(), name='payment-execute'),

    path('payments/user/<user_id>/', UserPaymentsView.as_view(), name='user-payments'),
]
