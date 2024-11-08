from abc import ABC, abstractmethod
from decimal import Decimal
from uuid import UUID
from typing import List, Dict


class PaymentServiceBase(ABC):
    @abstractmethod
    def create_payment(self, user_id: UUID, amount: Decimal, currency: str) -> Dict:
        """Create a payment"""
        pass

    @abstractmethod
    def execute_payment(self, payment_id: UUID, payer_id: str) -> Dict:
        """Execute approved payment"""
        pass

    @abstractmethod
    def get_payment(self, payment_id: UUID) -> Dict:
        """Get payment details"""
        pass

    @abstractmethod
    def get_payments_by_user(self, user_id: UUID) -> List[Dict]:
        """Get user payments"""
        pass
