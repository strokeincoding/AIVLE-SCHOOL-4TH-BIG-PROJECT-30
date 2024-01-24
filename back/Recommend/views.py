from django.shortcuts import render
import pandas as pd 
from .models import Recommend
from .serializers import RecommendSerializer
from rest_framework import viewsets

# Recommend의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class RecommendViewSet(viewsets.ModelViewSet):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer
   
   	# serializer.save() 재정의
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    