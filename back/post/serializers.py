from .models import Post, Comment
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = Post
        fields = ['id', 'title', 'created_at', 'user', 'body']
        
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'created_at', 'comment']