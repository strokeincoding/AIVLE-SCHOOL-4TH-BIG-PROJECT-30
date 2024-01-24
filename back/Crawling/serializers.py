from rest_framework import serializers
from .models import Crawling, UserCrawlingLike

class CrawlingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crawling
        fields = '__all__'  

class UserCrawlingLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCrawlingLike
        fields = '__all__'
