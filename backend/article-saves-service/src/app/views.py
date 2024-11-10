from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from uuid import UUID
from .models import Article, ArticleCollection
from .serializer import ArticleSerializer, ArticleCollectionSerializer

class ArticleCollectionListAPIView(generics.ListAPIView):
    serializer_class = ArticleCollectionSerializer

    def get_queryset(self):
        user_info = self.request.user
        if not user_info:
            return ArticleCollection.objects.none()

        user_id = user_info.get('id')
        return ArticleCollection.objects.filter(user_id=user_id)

    def list(self, request, *args, **kwargs):
        if not request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        return super().list(request, *args, **kwargs)

class ArticleCollectionCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if not request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        data['user_id'] = self.request.user.get('id')

        serializer = ArticleCollectionSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticleCollectionAPIView(APIView):
    def get_object(self, collection_id):
        if not self.request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            obj = ArticleCollection.objects.get(id=collection_id)
        except ArticleCollection.DoesNotExist:
            raise PermissionDenied("Collection not found.")

        if str(obj.user_id) != str(self.request.user.get('id')):
            raise PermissionDenied(f"You do not have permission to edit this collection.")

        return obj

    def patch(self, request, *args, **kwargs):
        collection_id = kwargs.get('pk')
        collection = self.get_object(collection_id)

        serializer = ArticleCollectionSerializer(collection, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        collection_id = kwargs.get('pk')
        collection = self.get_object(collection_id)

        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleDeleteAPIView(APIView):
    def get_object(self, article_id):
        if not self.request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            obj = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            raise PermissionDenied("Collection not found.")

        if str(obj.user_id) != str(self.request.user.get('id')):
            raise PermissionDenied(f"You do not have permission to edit this collection.")

        return obj

    def delete(self, request, *args, **kwargs):
        article_id = kwargs.get('pk')
        article = self.get_object(article_id)

        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CollectionWithArticles(APIView):
    def get(self, request, *args, **kwargs):
        if not self.request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        collections = ArticleCollection.objects.filter(user_id=self.request.user.id)

        collections_data = []
        for collection in collections:
            articles = Article.objects.filter(collection_id=collection.id)
            article_data = ArticleSerializer(articles, many=True).data
            collection_data = ArticleCollectionSerializer(collection).data
            collections_data.append({
                'collection': collection_data,
                'articles': article_data,
            })

        return Response(collections_data, status=status.HTTP_200_OK)
class AddArticleToCollection(APIView):
    def post(self, request):
        if not request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        serializer = ArticleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticlesInCollections(APIView):
    def get(self, request):
        user_id = request.data['user_id']
        if not user_id:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        collections = ArticleCollection.objects.filter(user_id = user_id)

        articles = []
        for collection in collections:
            article = Article.objects.filter(collection_id = collection.id)
            articles.append({
                'collection_title': collection.title,
                'collection_id': collection.id,
                'id': article.site_id,
                'link':article.link,
            })
        return Response(articles, status=status.HTTP_200_OK)