import uuid
from django.db import models

# Create your models here.

class RssModel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    frequency_request = models.IntegerField
    status = models.CharField(
        max_length=50,
        choices=[('active', 'active'), ('disable', 'disable')],
        default= 'active'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class RssChanel(RssModel):
    url = models.URLField(unique=True)

class RssParser(RssModel):
    url = models.URLField()
    elements = models.JSONField()



