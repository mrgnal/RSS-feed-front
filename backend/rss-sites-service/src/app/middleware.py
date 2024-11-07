import requests
from django.http import JsonResponse


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.header.get('Authorization')

        if token:
            try:
                token = token.split(' ')[1]
                auth_service_url = 'http://user_auth/api/verify_token/'

                response = requests.get(auth_service_url, headers= {'Authorization': f'Bear {token}'})
                if response.status_code==200 and response.json() is True:
                    request.user_authenticated = True
                else:
                    return JsonResponse({'error': 'Invalid or expired token.'}, status=401)
            except Exception as e:
                return JsonResponse({'error':e}, status=401)
        else:
            return JsonResponse({'error': 'Authorization token not provided.'}, status=401)
        response = self.get_response(request)
        return response

