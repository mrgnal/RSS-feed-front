from django.contrib.auth import update_session_auth_hash
from rest_framework import status
from rest_framework.response import Response

class PasswordChangeService:
    @staticmethod
    def change_user_password(user, old_password, new_password, request):
        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)
            return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
