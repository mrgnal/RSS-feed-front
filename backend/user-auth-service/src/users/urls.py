from django.urls import path, include
from .views import LoginView, RegisterView, GoogleAuthInitView, GoogleAuthCallbackView, change_password, \
    UserProfileUpdateView, UserProfileDeleteView, SendEmailView, CustomTokenVerifyView, RefreshView, LogoutView, \
    DeactivateAccountView, ListUsersView, UserDetailsView, UpdateUserRoleView, UserStatisticsView, \
    UpdateNotificationPreferencesView, UserActivityLogsView
from . import views


urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('google/login/', GoogleAuthInitView.as_view(), name='google_auth_init'),
    path('google/login/callback/', GoogleAuthCallbackView.as_view(), name='google_auth_callback'),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path('user-profile/change_password/', change_password, name='change_password'),
    path('user-profile/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('user-profile/change_account_data/', UserProfileUpdateView.as_view(), name='change_data'),
    path('user-profile/delete_profile/', UserProfileDeleteView.as_view(), name='delete_profile'),
    path('send_email/', SendEmailView.as_view(), name='send_email'),
    path('verify_token/', CustomTokenVerifyView.as_view(), name='token_verify'),
    path('auth/jwt/refresh', RefreshView.as_view(), name='token_refresh'),

    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('user-profile/deactivate/account', DeactivateAccountView.as_view(), name='deactivate_account'),
    path('list-users', ListUsersView.as_view(), name='list_users'),
    path('user-profile/details', UserDetailsView.as_view(), name='user_details'),
    path('user-profile/update/role', UpdateUserRoleView.as_view(), name='update_user_role'),
    path('user-profile/update/notifications', UpdateNotificationPreferencesView.as_view(), name='update_user_notifications'),
    path('user-profile/get/statistics', UserStatisticsView.as_view(), name='get_user_statistics'),
    path('user-profile/get/log', UserActivityLogsView.as_view(), name='get_user_logs'),

]
