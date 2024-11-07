import uuid
from django.db import models
from django.utils import timezone

class RssModel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()

    title = models.CharField(max_length=256)
    description = models.CharField(max_length=256)

    status = models.CharField(
        max_length=50,
        choices=[('active', 'active'), ('disable', 'disable')],
        default= 'active'
    )

    is_new = models.BooleanField(default=False)
    class Meta:
        abstract = True

class RssChanel(RssModel):
    url = models.URLField()
    last_update = models.DateTimeField()

class RssParser(RssModel):
    url = models.URLField()
    frequency = models.IntegerField(default=60)
    elements = models.JSONField()




