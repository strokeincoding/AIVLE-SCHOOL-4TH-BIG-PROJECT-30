
from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer, OccupationSerializer, EnvSerializer, CrawlingSerializer, LikeSerializer
from .models import User, TechnologyStack, Occupation, Env, Crawling, Like
from rest_framework import generics, viewsets
 
# 회원가입
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
   
# 기술스택
class TechnologyStackViewSet(viewsets.ModelViewSet):
    queryset = TechnologyStack.objects.all()
    serializer_class = TechnologyStackSerializer
 
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
 
# 선호직종
class OccupationViewSet(viewsets.ModelViewSet):
    queryset = Occupation.objects.all()
    serializer_class = OccupationSerializer
 
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
 
 # 유저
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
 
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
 
# 직업환경       
class EnvViewSet(viewsets.ModelViewSet):
    queryset = Env.objects.all()
    serializer_class = EnvSerializer
 
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
        
# 크롤링     
class CrawlingViewSet(viewsets.ModelViewSet):
    queryset = Crawling.objects.all()
    serializer_class = CrawlingSerializer
 
    def perform_create(self, serializer):
        serializer.save()
        
# 좋아요
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
 
    def perform_create(self, serializer):
        serializer.save()