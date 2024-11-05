from django.utils.timezone import now
from ..models import Subscription, SubscriptionType
from typing import List, Optional

from .abstract.SubscriptionServiceBase import SubscriptionServiceBase


class SubscriptionService(SubscriptionServiceBase):
    def get_user_subscriptions(self, user_id: int) -> List[Subscription]:
        return Subscription.objects.filter(user_id=user_id).order_by('-beginning_date')

    def get_current_subscription(self, user_id: int) -> Optional[Subscription]:
        return Subscription.objects.filter(user_id=user_id, end_date__isnull=True).order_by('-beginning_date').first()

    def create_subscription(self, user_id: int, subscription_type: SubscriptionType) -> Subscription:
        current_subscription = self.get_current_subscription(user_id)
        if current_subscription:
            current_subscription.end_date = now()
            current_subscription.save()

        new_subscription = Subscription.objects.create(
            user_id=user_id,
            subscription_type=subscription_type,
            beginning_date=now(),
        )

        return new_subscription
