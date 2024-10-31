from django.shortcuts import render
from rest_framework import viewsets
from .models import RssModel
from .serializers import *
# Create your views here.

# class RssViewSet(viewsets.ModelViewSet):
#     queryset = RssModel.objects.all()
#     serializer_class = RssSerializer

