from django.urls import path, include
from . import views
from rest_framework import urls
from .views import TechnologyStackViewSet,OccupationViewSet,UserViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('TechnologyStack', TechnologyStackViewSet)
router.register('Occupation', OccupationViewSet)
router.register('User', UserViewSet)
urlpatterns =[
    path('signup/', views.UserCreate.as_view()),
    path('', include(router.urls))
 ]