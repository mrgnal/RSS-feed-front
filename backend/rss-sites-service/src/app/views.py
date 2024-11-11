from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import RssChannelSerializer
from .models import RssChannel
from .feed import *

class RssChannelAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = request.user.get('id')
        if not user_id:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
        channels = RssChannel.objects.filter(user_id=user_id)
        count = len(channels)
        response_data = []
        for channel in channels:
            response_item ={
                'id': channel.id,
                'tittle': channel.source.get('tittle'),
                'subtitle': channel.source.get('subtitle'),
                'image_url': channel.source.get('image_url'),
                'is_new': channel.is_new,
                'status': channel.status,
                'created_at': channel.created_at,
            }
            response_data.append(response_item)

        return Response({'count':count, 'channels':response_data})

    def post(self, request, *args, **kwargs):
        user_id = request.user.get('id')
        if not user_id:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data.copy()
        data['user_id'] = user_id

        serializer = RssChannelSerializer(data=data)
        if serializer.is_valid():
                new_channel = serializer.save()
                feed_id = create_feed(new_channel.id, data).get('id')
                response_data = serializer.data + {'feed_id':feed_id}
                return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, channel_id):
        if not self.request.user:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            obj = RssChannel.objects.get(id=channel_id)
        except RssChannel.DoesNotExist:
            raise PermissionDenied("Collection not found.")

        if str(obj.user_id) != str(self.request.user.get('id')):
            raise PermissionDenied(f"You do not have permission to edit this collection.")

        return obj

    def patch(self, request, *args, **kwargs):
        channel_id = kwargs.get('pk')
        channel = self.get_object(channel_id)

        serializer = RssChannelSerializer(channel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        channel_id = kwargs.get('pk')
        channel = self.get_object(channel_id)

        delete_feed(channel_id)
        channel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RssChannelSourseAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = request.data
        channel = RssChannel.objects.filter(id=data['id'])

        response_data = channel.source
        return Response(response_data)
class RssChannelCountAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = request.user.get('id')
        if not user_id:
            return Response({'detail': 'User unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
        channels = RssChannel.objects.filter(user_id=user_id)
        count = len(channels)
        return Response({'count': count})