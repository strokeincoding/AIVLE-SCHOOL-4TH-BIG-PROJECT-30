from .models import Recommend
from rest_framework import serializers

class RecommendSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.nickname')
    class Meta:
        model = Recommend
        fields = ['id', 'title', 'user', 'cate','technology_stacks','env','Exp_require','occupation','Project_Description','image']
        