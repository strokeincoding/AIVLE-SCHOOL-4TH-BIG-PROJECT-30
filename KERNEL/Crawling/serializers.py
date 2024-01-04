from rest_framework import serializers
from .models import Crawling, UserCrawlingLike

class CrawlingSerializer(serializers.ModelSerializer):
    # is_liked_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Crawling
        fields = '__all__'  # 'is_liked_by_user' 필드 포함

    # def get_is_liked_by_user(self, obj):
    #     user = self.context['request'].user
    #     return UserCrawlingLike.objects.filter(user=user, crawling=obj).exists()


class UserCrawlingLikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserCrawlingLike
        fields = '__all__'
