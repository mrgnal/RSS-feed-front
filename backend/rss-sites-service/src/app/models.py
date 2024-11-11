import uuid
from django.db import models

class RssChannel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()

    source = models.JSONField()

    status = models.BooleanField(default=True)

    type = models.CharField(
        max_length=50,
        choices=[('generator', 'generator'), ('builder', 'builder')],
    )

    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.source.get('tittle')