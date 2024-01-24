from django.urls import path, include
from .views import CrawlingPostView, CrawlingLikeViewSet,UserLikedCrawlings
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('crawlingview', CrawlingPostView)
router.register('like', CrawlingLikeViewSet)
router.register('userliked', UserLikedCrawlings, basename='userliked')
urlpatterns = [
    path('', include(router.urls)),
]
