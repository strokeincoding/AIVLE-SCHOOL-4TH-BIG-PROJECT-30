from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Crawling, UserCrawlingLike
from .serializers import CrawlingSerializer,UserCrawlingLikeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

class CrawlingPostView(viewsets.ModelViewSet):
    queryset = Crawling.objects.all()
    serializer_class = CrawlingSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
class CrawlingLikeViewSet(viewsets.ModelViewSet):
    queryset = UserCrawlingLike.objects.all()
    serializer_class = UserCrawlingLikeSerializer
    permission_classes = [IsAuthenticated]

    # 좋아요를 누를 때
    def create(self, request):
        user = self.request.user
        crawling_id = request.data.get("crawling")

        # 이미 좋아요를 눌렀는지 확인
        existing_like = UserCrawlingLike.objects.filter(user=user, crawling=crawling_id).first()

        if existing_like:
            # 이미 좋아요를 누른 상태에서 다시 누르면 좋아요 취소
            existing_like.delete()
            # Crawling 모델의 like_count 감소
            crawling = get_object_or_404(Crawling, pk=crawling_id)
            crawling.like_count -= 1
            crawling.save()
            return Response({"message": "좋아요 취소됨"}, status=status.HTTP_200_OK)
        else:
            # 좋아요를 누르지 않은 상태에서 누르면 좋아요 추가
            like_data = {"user": user.id, "crawling": crawling_id}
            serializer = self.get_serializer(data=like_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # Crawling 모델의 like_count 증가
            crawling = get_object_or_404(Crawling, pk=crawling_id)
            crawling.like_count += 1
            crawling.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
