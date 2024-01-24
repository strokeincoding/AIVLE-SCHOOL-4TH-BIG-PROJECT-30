from django.shortcuts import render
from .serializers import UserSerializer, TechnologyStackSerializer, OccupationSerializer, EnvSerializer
from .models import User, TechnologyStack, Occupation, Env
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import viewsets, status
 
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
        
    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        print("Incoming Data:", request.data)  
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
    
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        
        return Response(serializer.data)          
 
# 직업환경       
class EnvViewSet(viewsets.ModelViewSet):
    queryset = Env.objects.all()
    serializer_class = EnvSerializer
 
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
        
    
    

        
