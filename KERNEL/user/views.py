from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer, OccupationSerializer
from .models import User, TechnologyStack, Occupation
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

