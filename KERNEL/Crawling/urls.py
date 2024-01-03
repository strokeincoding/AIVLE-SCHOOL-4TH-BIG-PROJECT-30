from django.urls import path, include
from .views import CrawlingPostView, CrawlingLikeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('crawlingview', CrawlingPostView)
router.register('like', CrawlingLikeViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
