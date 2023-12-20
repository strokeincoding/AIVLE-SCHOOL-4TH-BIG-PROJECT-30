from django.shortcuts import render

# Create your views here.
from .models import post
from .serializer import PostSerializer
from rest_framework import viewsets

# Post의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PostViewSet(viewsets.ModelViewSet):
    queryset = post.objects.all()
    serializer_class = PostSerializer
   
   	# serializer.save() 재정의
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)