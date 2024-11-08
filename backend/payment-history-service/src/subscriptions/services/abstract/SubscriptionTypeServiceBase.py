from abc import ABC, abstractmethod
from typing import List, Optional
from ...models import SubscriptionType


class SubscriptionServiceBase(ABC):
    @abstractmethod
    def get_all_subscriptions(self) -> List[SubscriptionType]:
        pass

    @abstractmethod
    def get_type_by_id(self, id) -> SubscriptionType:
        pass