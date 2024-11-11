from django.urls import path
from .views import (ArticleCollectionListAPIView,ArticleCollectionCreateAPIView,ArticleCollectionAPIView,
                    ArticleDeleteAPIView,AddArticleToCollection, CollectionWithArticles, ArticlesInCollections)

urlpatterns = [
    path('article_collections/', ArticleCollectionListAPIView.as_view()),
    path('article_collections/create/', ArticleCollectionCreateAPIView.as_view()),
    path('article_collections/<uuid:pk>/update/', ArticleCollectionAPIView.as_view()),
    path('article_collections/<uuid:pk>/delete/', ArticleCollectionAPIView.as_view()),
    path('article/<uuid:pk>/delete/', ArticleDeleteAPIView.as_view()),
    path('article/add/', AddArticleToCollection.as_view()),
    path('article_collection/articles/', CollectionWithArticles.as_view()),
    path('article/saved/', ArticlesInCollections.as_view()),
]