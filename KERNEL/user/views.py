from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer
from .models import User, TechnologyStack
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