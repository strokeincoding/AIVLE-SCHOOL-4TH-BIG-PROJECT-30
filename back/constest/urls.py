from django.urls import path
from .views import Contest

urlpatterns = [
    path('', Contest.as_view(), name='contest'),  # URL과 View 연결
]