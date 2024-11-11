from django.db import models
import uuid

class ArticleCollection(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    title = models.CharField(max_length=256)

class Article(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    collection_id = models.ForeignKey(ArticleCollection, on_delete=models.CASCADE, related_name='articles')

    site_id = models.TextField()
    title = models.CharField(max_length=256)
    link = models.URLField()
    image = models.URLField(null=True)
    summary = models.TextField(null=True)
    author = models.CharField(max_length=256, null=True)
    published = models.DateTimeField(null=True)
