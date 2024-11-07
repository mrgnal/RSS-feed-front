import uuid
from django.db import models
from django.utils import timezone

# Create your models here.

class RssModel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=256)
    description = models.CharField(max_length=256)

    status = models.CharField(
        max_length=50,
        choices=[('active', 'active'), ('disable', 'disable')],
        default= 'active'
    )

    user_id = models.UUIDField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class RssChanel(RssModel):
    url = models.URLField()

class RssParser(RssModel):
    url = models.URLField()
    frequency = models.IntegerField(default=60)
    elements = models.JSONField()



