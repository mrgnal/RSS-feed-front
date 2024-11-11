import datetime
import uuid
from django.db import models

class RssChannel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()

    url = models.URLField(null=False)
    title = models.CharField(max_length=256, default='Untitled')
    updated = models.DateTimeField(default=datetime.datetime.now)
    subtitle = models.TextField(null=True)
    image_url = models.URLField(null=True)

    status = models.BooleanField(default=True)

    type = models.CharField(
        max_length=50,
        choices=[('generator', 'generator'), ('builder', 'builder')],
    )

    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.source.get('tittle')