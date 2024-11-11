from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SubscriptionType
from .services.SubscriptionService import SubscriptionService
from .services.SubscriptionTypeService import SubscriptionTypeService
from .serializers import SubscriptionSerializer, SubscriptionTypeSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .services.abstract import SubscriptionTypeServiceBase


class IsTokenValid(BasePermission):
    def has_permission(self, request, view):
        return request.user is not None


class UserSubscriptionHistoryView(APIView):
    permission_classes = [IsTokenValid]
    service = SubscriptionService()

    @swagger_auto_schema(
        operation_description="Get all subscriptions for a user.",
        responses={
            200: openapi.Response(
                description="Successful retrieval of user subscriptions.",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Subscription ID'),
                            'subscription_type': openapi.Schema(type=openapi.TYPE_STRING,
                                                                description='Type of subscription'),
                            'beginning_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                             description='Beginning date of the subscription'),
                            'end_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                       description='End date of the subscription'),
                            'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the user'),
                        },
                    )
                )
            ),
            401: "Unauthorized",
        },
    )

    def get(self, request):
        user_info = request.user_info['user_info']
        user_id = user_info['id']
        subscriptions = self.service.get_user_subscriptions(user_id)
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserCurrentSubscriptionView(APIView):
    permission_classes = [IsTokenValid]
    service = SubscriptionService()

    @swagger_auto_schema(
        operation_description="Get the current active subscription for a user.",
        responses={
            200: openapi.Response(
                description="Successful retrieval of the current subscription.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Subscription ID'),
                        'subscription_type': openapi.Schema(type=openapi.TYPE_STRING,
                                                            description='Type of subscription'),
                        'beginning_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                         description='Beginning date of the subscription'),
                        'end_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME,
                                                   description='End date of the subscription'),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the user'),
                    },
                )
            ),
            404: "No active subscription found.",
            401: "Unauthorized",
        },
    )

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

    @swagger_auto_schema(
        request_body=SubscriptionSerializer,
    )

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


class AllSubscriptionTypesView(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.typeService: SubscriptionTypeServiceBase = SubscriptionTypeService()

    def get(self, request):
        return Response(SubscriptionTypeSerializer(self.typeService.get_all_subscriptions(),many=True).data)


class SubscriptionTypeByIdView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.typeService: SubscriptionTypeServiceBase = SubscriptionTypeService()

    def get(self, request, id):
        print(self.typeService.get_type_by_id(id))
        return Response(SubscriptionTypeSerializer(self.typeService.get_type_by_id(id)).data)

class UserLimitsView(APIView):
    permission_classes = [IsTokenValid]
    service = SubscriptionService()

    @swagger_auto_schema(
        operation_description="Get the current active subscription for a user.",
        responses={
            200: openapi.Response(
                description="Successful retrieval of the current subscription.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'max_feeds': openapi.Schema(type=openapi.TYPE_INTEGER, description='max_feeds'),
                        'max_rss': openapi.Schema(type=openapi.TYPE_STRING,
                                                            description='max_rss'),
                    },
                )
            ),
            404: "No active subscription found.",
            401: "Unauthorized",
        },
    )

    def get(self, request):
        print(request.user_info)
        user_info = request.user_info['user_info']
        user_id = user_info['id']
        subscription = self.service.get_current_subscription(user_id)
        if subscription:
            subscription_type = subscription.subscription_type
            data = {'max_feeds': subscription_type.max_feeds, 'max_rss': subscription_type.max_rss}
            return Response(data, status=status.HTTP_200_OK)
        return Response({"detail": "No active subscription found."}, status=status.HTTP_404_NOT_FOUND)