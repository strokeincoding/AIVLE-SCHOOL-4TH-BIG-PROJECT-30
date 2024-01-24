from django.urls import path, include
from .views import RecommendViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('Recommend', RecommendViewSet)
urlpatterns =[
    path('', include(router.urls))
]