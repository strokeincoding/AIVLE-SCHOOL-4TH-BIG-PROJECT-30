from .models import post,Comment
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    #user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = post
        fields = ['id', 'title', 'created_at', 'body'] #'user'넣어야함
        
class CommentSerializer(serializers.ModelSerializer):
    #user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = Comment
        fields = ['id', 'post', 'created_at', 'comment'] #'user'넣어야함