from .models import User, TechnologyStack, Occupation, Env
from rest_framework import serializers
from django.core.validators import EmailValidator

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[EmailValidator(message="이메일 형식이 맞지 않습니다")])
    
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

    def update(self, instance, validated_data):
        technology_stacks_data = validated_data.pop('technology_stacks', None)
        occupation_data = validated_data.pop('occupation', None)
        env_data = validated_data.pop('env', None)

        instance.name = validated_data.get('name', instance.name)
        instance.save()

        if technology_stacks_data is not None:
            instance.technology_stacks.set(technology_stacks_data)
        if occupation_data is not None:
            instance.occupation.set(occupation_data)
        if env_data is not None:
            instance.env.set(env_data)

        return instance
        
    class Meta:
        model = User
        fields = ['id','nickname', 'email', 'name', 'password', 'occupation','technology_stacks', 'env']# 필드에 추가
        
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


