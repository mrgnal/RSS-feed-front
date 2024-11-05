import os
from dotenv import load_dotenv
from ..models import Payment, PaymentServiceException, PaymentStatus, PaymentNotFoundException
from .abstract.PaymentServiceBase import PaymentServiceBase
from abc import ABC, abstractmethod
from decimal import Decimal
from typing import Dict, List
from uuid import UUID
import logging
from django.conf import settings
from django.db import models, transaction
import paypalrestsdk

load_dotenv()

paypalrestsdk.configure({
    "mode": os.getenv("PAYPAL_MODE", "sandbox"),
    "client_id": os.getenv("PAYPAL_CLIENT_ID"),
    "client_secret": os.getenv("PAYPAL_CLIENT_SECRET")
})

class PayPalPaymentService(PaymentServiceBase):
    def __init__(self):
        paypalrestsdk.configure({
            "mode": settings.PAYPAL_MODE,
            "client_id": settings.PAYPAL_CLIENT_ID,
            "client_secret": settings.PAYPAL_CLIENT_SECRET
        })

    def _create_paypal_payment(self, amount: Decimal, currency: str) -> paypalrestsdk.Payment:
        return paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": str(amount),
                    "currency": currency
                },
                "description": f"Payment {amount} {currency}"
            }],
            "redirect_urls": {
                "return_url": settings.PAYPAL_RETURN_URL,
                "cancel_url": settings.PAYPAL_CANCEL_URL
            }
        })

    @transaction.atomic
    def create_payment(self, user_id: UUID, amount: Decimal, currency: str) -> Dict:
        try:
            paypal_payment = self._create_paypal_payment(amount, currency)

            if not paypal_payment.create():
                logger.error(f"PayPal payment creation failed: {paypal_payment.error}")
                raise PaymentServiceException(f"Failed to create PayPal payment: {paypal_payment.error}")

            payment = Payment.objects.create(
                user_id=user_id,
                payment_system_id=paypal_payment.id,
                amount=amount,
                currency=currency,
                status=PaymentStatus.CREATED
            )

            approval_url = next(
                link.href for link in paypal_payment.links
                if link.rel == "approval_url"
            )

            return {
                "payment_id": payment.id,
                "approval_url": approval_url
            }

        except Exception as e:
            logger.error(f"Payment creation failed: {str(e)}")
            raise PaymentServiceException(f"Payment creation failed: {str(e)}")

    @transaction.atomic
    def execute_payment(self, payment_id, payer_id: str) -> Dict:
        try:
            payment = Payment.objects.select_for_update().get(payment_system_id=payment_id)
            paypal_payment = paypalrestsdk.Payment.find(payment.payment_system_id)

            if not paypal_payment.execute({"payer_id": payer_id}):
                payment.status = PaymentStatus.FAILED
                payment.error_message = str(paypal_payment.error)
                payment.save()
                raise PaymentServiceException(f"Payment execution failed: {paypal_payment.error}")

            payment.status = PaymentStatus.COMPLETED
            payment.save()

            return {
                "payment_id": payment.id,
                "status": payment.status
            }

        except Payment.DoesNotExist:
            raise PaymentNotFoundException(f"Payment {payment_id} not found")
        except Exception as e:
            logger.error(f"Payment execution failed: {str(e)}")
            raise PaymentServiceException(f"Payment execution failed: {str(e)}")

    def get_payment(self, payment_id: UUID) -> Dict:
        try:
            payment = Payment.objects.get(id=payment_id)
            return {
                "id": payment.id,
                "amount": payment.amount,
                "currency": payment.currency,
                "status": payment.status,
                "created_at": payment.created_at
            }
        except Payment.DoesNotExist:
            raise PaymentNotFoundException(f"Payment {payment_id} not found")

    def get_payments_by_user(self, user_id: UUID) -> List[Dict]:
        print(user_id)
        payments = Payment.objects.filter(user_id=user_id)
        return [
            {
                "id": payment.id,
                "amount": payment.amount,
                "currency": payment.currency,
                "status": payment.status,
                "created_at": payment.created_at
            }
            for payment in payments
        ]




# Налаштування логування
logger = logging.getLogger(__name__)





