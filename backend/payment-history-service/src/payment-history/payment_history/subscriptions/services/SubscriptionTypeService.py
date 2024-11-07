from typing import List
from .abstract.SubscriptionTypeServiceBase import SubscriptionServiceBase
from ..models import SubscriptionType


class SubscriptionTypeService(SubscriptionServiceBase):
    def get_all_subscriptions(self) -> List[SubscriptionType]:
        return SubscriptionType.objects.all()

    def get_type_by_id(self, id) -> SubscriptionType:
        return SubscriptionType.objects.filter(id=id).first()
