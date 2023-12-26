from django.urls import path
from .views import OpenAIView

urlpatterns = [
    path('', OpenAIView.as_view(), name='chat-gpt'),  # URL과 View 연결
]