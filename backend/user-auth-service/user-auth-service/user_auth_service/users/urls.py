from django.urls import path, include
from .views import LoginView, RegisterView,GoogleAuthInitView,GoogleAuthCallbackView


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('google/login/', GoogleAuthInitView.as_view(), name='google_auth_init'),
    path('google/login/callback/', GoogleAuthCallbackView.as_view(), name='google_auth_callback'),
]
