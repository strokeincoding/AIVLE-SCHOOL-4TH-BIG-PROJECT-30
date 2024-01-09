from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Crawling, UserCrawlingLike
from .serializers import CrawlingSerializer,UserCrawlingLikeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from user.models import User
import pandas as pd 
from surprise import Dataset, Reader, SVD
from collections import defaultdict
import numpy as np 
from django.db.models import Prefetch

def hybrid(user_id):
    users = User.objects.all().prefetch_related('occupation')  # 사용자의 직업 정보를 사전 로드
    crawlings = Crawling.objects.all()
    
    # 좋아요 정보를 한 번에 가져오기
    likes = UserCrawlingLike.objects.select_related('user', 'crawling')

    items = {}
    ratings = []

    for crawling in crawlings:
        liked_users = likes.filter(crawling=crawling).values_list('user', flat=True)

        # 직업 정보를 효율적으로 처리
        occupations = set()
        for liked_user in users.filter(id__in=liked_users):
            occupations.update([occupation.occupation_name for occupation in liked_user.occupation.all()])

        items[str(crawling.id)] = list(occupations)

        for user in users:
            like = 1 if user.id in liked_users else 0
            ratings.append((str(user.id), str(crawling.id), like))
    
    ratings_df = pd.DataFrame(ratings, columns=['user', 'item', 'rating'])
    reader = Reader(rating_scale=(0, 1))
    data = Dataset.load_from_df(ratings_df[['user', 'item', 'rating']], reader)
    
    def calculate_similarity(item1, item2):
        set1 = set(items[item1])
        set2 = set(items[item2])
        if not set1 or not set2:
            return 0
        common_elements = len(set1.intersection(set2))
        return common_elements / max(len(set1), len(set2))
    
    item_similarity = defaultdict(dict)
    for item1 in items:
        for item2 in items:
            if item1 != item2:
                item_similarity[item1][item2] = calculate_similarity(item1, item2)

    # 협업 필터링 모델 훈련
    algo = SVD()
    trainset = data.build_full_trainset()
    algo.fit(trainset)
    
    def hybrid_recommendations(user_id=user_id):
        user_id = str(user_id)
        # 사용자가 이미 평가한 아이템 제외
        rated_items = ratings_df[(ratings_df['user'] == user_id) & (ratings_df['rating'] == 1)]['item'].values

        cf_scores = []
        for item_id in items:
            if item_id not in rated_items:
                est = algo.predict(user_id, item_id).est
                cf_scores.append((item_id, est))

        cb_scores = []
        for item_id, sim_scores in item_similarity.items():
            if item_id not in rated_items:
                sim_score = np.mean(list(sim_scores.values()))
                cb_scores.append((item_id, sim_score))

        hybrid_scores = defaultdict(float)
        for item_id, score in cf_scores:
            hybrid_scores[item_id] += score
        for item_id, score in cb_scores:
            hybrid_scores[item_id] += score
        

        recommendations = sorted(hybrid_scores.items(), key=lambda x: x[1], reverse=True)[:]
        return [rec[0] for rec in recommendations] 
    return hybrid_recommendations()


class CrawlingPostView(viewsets.ModelViewSet):
    queryset = Crawling.objects.all()
    serializer_class = CrawlingSerializer
    def perform_create(self, serializer):
        serializer.save()
    def list(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            recommended_ids = hybrid(user.id)  # 추천 시스템 실행

            # 추천된 아이템을 조회
            recommended_crawlings = Crawling.objects.filter(id__in=recommended_ids)
            # 추천 순서대로 정렬
            ordered_crawlings = sorted(recommended_crawlings, key=lambda x: recommended_ids.index(str(x.id)))

            # Serializer를 사용하여 데이터 포맷팅
            serializer = self.get_serializer(ordered_crawlings, many=True)
            return Response(serializer.data)
        
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


class UserLikedCrawlings(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        liked_crawlings = UserCrawlingLike.objects.filter(user=user).values_list('crawling', flat=True)
        crawlings = Crawling.objects.filter(id__in=liked_crawlings)
        serializer = CrawlingSerializer(crawlings, many=True)
        return Response(serializer.data)
