from abc import ABC, abstractmethod
from typing import List, Optional
from ...models import Subscription, SubscriptionType


class SubscriptionServiceBase(ABC):
    @abstractmethod
    def get_user_subscriptions(self, user_id: int) -> List[Subscription]:
        """Отримати історію всіх підписок користувача."""
        pass

    @abstractmethod
    def get_current_subscription(self, user_id: int) -> Optional[Subscription]:
        """Отримати поточну активну підписку користувача."""
        pass

    @abstractmethod
    def create_subscription(self, user_id: int, subscription_type: SubscriptionType) -> Subscription:
        """Створити нову підписку для користувача."""
        pass
