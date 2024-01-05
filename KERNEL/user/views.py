from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer, OccupationSerializer, EnvSerializer
from .models import User, TechnologyStack, Occupation, Env
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

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
        


