from django.urls import path, include
from . import views
from rest_framework import urls
from .views import TechnologyStackViewSet,OccupationViewSet,UserViewSet,EnvViewSet, CrawlingViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('TechnologyStack', TechnologyStackViewSet)
router.register('Occupation', OccupationViewSet)
router.register('User', UserViewSet)
router.register('Env', EnvViewSet)
router.register('Crawling', CrawlingViewSet)
#router.register('Like', LikeViewSet)
urlpatterns =[
    path('crawling/<int:pk>/like/', views.CrawlingViewSet.as_view({'post': 'like'}), name='crawling-like'),
    path('signup/', views.UserCreate.as_view()),
    path('', include(router.urls)),
    #path('crawling/<int:pk>/like/', views.CrawlingViewSet.as_view({'post': 'like'}), name='crawling-like'),
 ]