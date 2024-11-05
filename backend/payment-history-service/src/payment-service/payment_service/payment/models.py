import uuid
from django.db import models

class PaymentStatus:
    CREATED = 'created'
    APPROVED = 'approved'
    COMPLETED = 'completed'
    FAILED = 'failed'
    CANCELLED = 'cancelled'

    CHOICES = [
        (CREATED, 'Created'),
        (APPROVED, 'Approved'),
        (COMPLETED, 'Completed'),
        (FAILED, 'Failed'),
        (CANCELLED, 'Cancelled'),
    ]

class PaymentServiceException(Exception):
    """Base exception for payment service errors"""
    pass


class PaymentNotFoundException(PaymentServiceException):
    """Raised when payment is not found"""
    pass

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(db_index=True)
    payment_system_id = models.CharField(max_length=100, unique=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)  # ISO 4217 currency codes
    status = models.CharField(max_length=20, choices=PaymentStatus.CHOICES)
    error_message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "payments"
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment {self.id} - {self.amount} {self.currency} ({self.status})"
