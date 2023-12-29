from django.shortcuts import render
import pandas as pd 
from .models import Recommend
from user.models import Occupation, User
from .serializers import RecommendSerializer
from rest_framework import viewsets
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import JsonResponse
# Recommend의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class RecommendViewSet(viewsets.ModelViewSet):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer
   
   	# serializer.save() 재정의
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    