from django.urls import path, include
from . import views
from rest_framework import urls
from .views import TechnologyStackViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('TechnologyStack', TechnologyStackViewSet)
urlpatterns =[
    path('signup/', views.UserCreate.as_view()),
    path('', include(router.urls))
 ]