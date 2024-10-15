from rest_framework.views import APIView
from rest_framework.response import Response
from .services.AuthService import AuthService
class AuthViewBase(APIView):
    auth_service_class = AuthService

    def get_auth_service(self):
        return self.auth_service_class()

class RegisterView(AuthViewBase):
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.register(request.data)
        return Response(result, status=result['status_code'])

class LoginView(AuthViewBase):
    def post(self, request):
        auth_service = self.get_auth_service()
        result = auth_service.authenticate(request.data)
        return Response(result, status=result['status_code'])
