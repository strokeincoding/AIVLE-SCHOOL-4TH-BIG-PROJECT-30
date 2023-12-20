from django.urls import path, include
from .views import PostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('post', PostViewSet)

urlpatterns =[
    path('', include(router.urls))
]