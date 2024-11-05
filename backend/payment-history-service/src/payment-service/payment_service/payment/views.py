import uuid
from decimal import Decimal
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import PaymentNotFoundException, PaymentServiceException
from .services.PayPalPaymentService import PayPalPaymentService, logger
from .services.abstract.PaymentServiceBase import PaymentServiceBase
from uuid import UUID
from drf_yasg import openapi
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode

paypal_service : PaymentServiceBase


class PaymentExecuteView(APIView):
    payment_service = PayPalPaymentService()

    @swagger_auto_schema(
        operation_description="Execute approved PayPal payment",
        manual_parameters=[
            openapi.Parameter(
                "payment_id",
                openapi.IN_QUERY,
                description="The ID of the payment to execute",
                type=openapi.TYPE_STRING,
                format="uuid",
                required=True
            ),
            openapi.Parameter(
                "payer_id",
                openapi.IN_QUERY,
                description="The ID of the payer",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            status.HTTP_200_OK: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "payment_id": openapi.Schema(type=openapi.TYPE_STRING),
                    "status": openapi.Schema(type=openapi.TYPE_STRING),
                }
            )
        }
    )

    def get(self, request):
        try:
            payment_id = request.query_params.get("paymentId")
            payer_id = request.query_params.get("PayerID")
            result = self.payment_service.execute_payment(payment_id, payer_id)
            return Response(result)

        except (ValueError, ValidationError) as e:
            return Response(
                {"error": f"Invalid input: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except PaymentNotFoundException as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_404_NOT_FOUND
            )
        except PaymentServiceException as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error in payment execution: {str(e)}")
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserPaymentsView(APIView):
    payment_service = PayPalPaymentService()

    @swagger_auto_schema(
        operation_description="Get user payments",
        responses={
            status.HTTP_200_OK: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "payments": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                "id": openapi.Schema(type=openapi.TYPE_STRING),
                                "amount": openapi.Schema(type=openapi.TYPE_NUMBER),
                                "currency": openapi.Schema(type=openapi.TYPE_STRING),
                                "status": openapi.Schema(type=openapi.TYPE_STRING),
                                "created_at": openapi.Schema(type=openapi.TYPE_STRING, format="date-time"),
                            }
                        )
                    )
                }
            )
        }
    )
    def get(self, request, user_id):
        try:
            print(user_id)
            user_id = uuid.UUID(user_id)
            print(user_id)
            payments = self.payment_service.get_payments_by_user(user_id)
            return Response({"payments": payments})

        except ValueError as e:
            return Response(
                {"error": f"Invalid user ID: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Error retrieving user payments: {str(e)}")
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PaymentView(APIView):
    payment_service = PayPalPaymentService()

    @swagger_auto_schema(
        operation_description="Create PayPal payment",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "user_id": openapi.Schema(type=openapi.TYPE_STRING, format="uuid"),
                "amount": openapi.Schema(type=openapi.TYPE_NUMBER),
                "currency": openapi.Schema(type=openapi.TYPE_STRING, default="USD"),
            },
            required=["user_id", "amount"]
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "payment_id": openapi.Schema(type=openapi.TYPE_STRING),
                    "approval_url": openapi.Schema(type=openapi.TYPE_STRING),
                }
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "error": openapi.Schema(type=openapi.TYPE_STRING),
                }
            )
        }
    )
    def post(self, request):
        try:
            user_id = UUID(request.data.get("user_id"))
            amount = Decimal(str(request.data.get("amount")))
            currency = request.data.get("currency", "USD")

            if amount <= 0:
                return Response(
                    {"error": "Amount must be greater than 0"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            result = self.payment_service.create_payment(user_id, amount, currency)
            return Response(result, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response(
                {"error": f"Invalid input: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except PaymentServiceException as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error in payment creation: {str(e)}")
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )