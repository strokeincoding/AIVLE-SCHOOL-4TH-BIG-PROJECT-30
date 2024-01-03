from .models import User, TechnologyStack, Occupation, Env, Crawling, Like
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # technology_stacks 필드를 다대다 관계로 정의
    technology_stacks = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=TechnologyStack.objects.all(), # 기술 스택을 가져오기 위한 쿼리셋
        required=False
    )
    # occupation 필드를 다대다 관계로 정의
    occupation = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Occupation.objects.all(), # 선호 직종을 가져오기 위한 쿼리셋
        required=False
    )
    # env 필드를 다대다 관계로 정의
    env = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Env.objects.all(), # 작업 환경을 가져오기 위한 쿼리셋
        required=False
    )
    def create(self, validated_data):
        technology_stacks_data = validated_data.pop('technology_stacks', [])
        occupation_data = validated_data.pop('occupation', None)
        user = User.objects.create_user(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            name = validated_data['name'],
            password = validated_data['password'],
            env = validated_data['env'],
        )
        user.technology_stacks.set(technology_stacks_data)
        user.occupation.set(occupation_data)
        return user
    class Meta:
        model = User
        fields = ['nickname', 'email', 'name', 'password', 'occupation','technology_stacks', 'env']# 필드에 추가
        
class TechnologyStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyStack
        fields = ['id', 'stack_name']
        
class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = ['id', 'occupation_name']
        
class EnvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Env
        fields = ['id', 'env_name']
     
class CrawlingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crawling
        fields = ['id', 'title','body','image', 'url']
        
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id','user_id', 'crawling_id']
        