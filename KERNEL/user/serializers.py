from .models import User, TechnologyStack
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # technology_stacks 필드를 다대다 관계로 정의
    technology_stacks = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=TechnologyStack.objects.all(), # 기술 스택을 가져오기 위한 쿼리셋
        required=False
    )
    def create(self, validated_data):
        technology_stacks_data = validated_data.pop('technology_stacks', [])
        user = User.objects.create_user(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            name = validated_data['name'],
            password = validated_data['password'],
            cover_letter=validated_data.get('cover_letter', None),  # 자기소개서 추가
            occupation=validated_data.get('occupation', None)        # 선호 직업 추가
        )
        user.technology_stacks.set(technology_stacks_data)
        return user
    class Meta:
        model = User
        fields = ['nickname', 'email', 'name', 'password','cover_letter', 'occupation','technology_stacks']# 필드에 추가
        
class TechnologyStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyStack
        fields = ['id', 'stack_name']