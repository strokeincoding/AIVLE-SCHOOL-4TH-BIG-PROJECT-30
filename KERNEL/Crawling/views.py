from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Crawling, UserCrawlingLike
from .serializers import CrawlingSerializer,UserCrawlingLikeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


class CrawlingPostView(viewsets.ModelViewSet):
    queryset = Crawling.objects.all()
    serializer_class = CrawlingSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
class CrawlingLikeViewSet(viewsets.ModelViewSet):
    queryset = UserCrawlingLike.objects.all()
    serializer_class = UserCrawlingLikeSerializer

    