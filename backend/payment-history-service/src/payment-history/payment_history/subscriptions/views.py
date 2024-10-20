from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SubscriptionType
from .services.SubscriptionService import SubscriptionService
from .serializers import SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission


class IsTokenValid(BasePermission):
    def has_permission(self, request, view):
        return request.user is not None


class UserSubscriptionHistoryView(APIView):
    permission_classes = [IsTokenValid]
    service = SubscriptionService()

    def get(self, request):
        user_info = request.user_info['user_info']
        user_id = user_info['id']
        subscriptions = self.service.get_user_subscriptions(user_id)
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserCurrentSubscriptionView(APIView):
    permission_classes = [IsTokenValid]
    service = SubscriptionService()

    def get(self, request):
        print(request.user_info)
        user_info = request.user_info['user_info']
        user_id = user_info['id']
        subscription = self.service.get_current_subscription(user_id)
        if subscription:
            serializer = SubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No active subscription found."}, status=status.HTTP_404_NOT_FOUND)


class CreateSubscriptionView(APIView):
    permission_classes = [IsTokenValid]

    def post(self, request):
        subscription_type_id = request.data.get("subscription_type_id")

        try:
            subscription_type = SubscriptionType.objects.get(id=subscription_type_id)
        except SubscriptionType.DoesNotExist:
            return Response({"error": "Subscription type not found."}, status=status.HTTP_404_NOT_FOUND)

        subscription_service = SubscriptionService()
        user_info = request.user_info['user_info']
        subscription = subscription_service.create_subscription(user_id=user_info['id'],
                                                                subscription_type=subscription_type)

        return Response({"subscription_id": subscription.id}, status=status.HTTP_201_CREATED)