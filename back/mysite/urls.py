from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('post/', include('post.urls')),
    path('user/', include('user.urls')),
    path('recommend/', include('Recommend.urls')),
    path('user/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/token/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('chat-gpt/', include('mandalart.urls')),
    path('chatbot/', include('chatbot.urls')),
    path('constest/', include('constest.urls')),
    path('crawling/', include('Crawling.urls'))
 ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)