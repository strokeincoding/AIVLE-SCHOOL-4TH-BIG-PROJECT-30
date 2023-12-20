from .models import post,Comment
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    class Meta:
        model = post
        fields = ['id', 'title', 'created_at', 'user', 'body'] #'user'넣어야함
        
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    class Meta:
        model = Comment
        fields = ['id', 'post', 'created_at','user', 'comment'] #'user'넣어야함