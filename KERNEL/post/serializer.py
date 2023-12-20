from .models import post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = post
        fields = ['id', 'title', 'created_at', 'user', 'body']