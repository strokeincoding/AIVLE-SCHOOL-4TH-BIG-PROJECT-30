from django.shortcuts import render

# Create your views here.
from .models import post, Comment
from .serializer import PostSerializer,CommentSerializer
from rest_framework import viewsets
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
#from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

# Post의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = post.objects.all()
    serializer_class = PostSerializer
   
   	# serializer.save() 재정의, 지금은 user제외
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

# (댓글) Comment 보여주기, 수정하기, 삭제하기 모두 가능
class CommentViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)