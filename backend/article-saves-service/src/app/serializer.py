from rest_framework import serializers
from .models import ArticleCollection, Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCollection
        fields = '__all__'

