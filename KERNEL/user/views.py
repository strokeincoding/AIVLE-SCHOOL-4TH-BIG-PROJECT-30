
from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer, OccupationSerializer, EnvSerializer, CrawlingSerializer
from .models import User, TechnologyStack, Occupation, Env, Crawling
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated
 
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

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        crawling = self.get_object()
        user = request.user
        
        if not user.is_authenticated:
            raise NotAuthenticated('로그인이 필요합니다')
        
        if crawling.like.filter(id=user.id).exists():
            crawling.like.remove(user)
            return Response({'status': 'like removed'})
        else:
            crawling.like.add(user)
            return Response({'status': 'like added'})
        
# 좋아요
# class LikeViewSet(viewsets.ModelViewSet):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer

#     @action(detail=True, methods=['post'])
#     def add_or_remove_like(self, request, pk=None):
#         like_instance = self.get_object()
#         user = request.user

#         if user in like_instance.user_id.all():
#             like_instance.user_id.remove(user)
#             return Response({'status': '좋아요 제거'})
#         else:
#             like_instance.user_id.add(user)
#             return Response({'status': '좋아요 추가'})