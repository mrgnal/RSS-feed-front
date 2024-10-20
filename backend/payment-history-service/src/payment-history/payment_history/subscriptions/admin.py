from django.contrib import admin
from .models import SubscriptionType, Subscription

admin.site.register(Subscription)
admin.site.register(SubscriptionType)
