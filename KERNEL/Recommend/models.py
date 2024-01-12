from django.db import models
from user.models import User, Occupation, TechnologyStack, Env

class Recommend(models.Model):
    # 1. 추천게시글의 id 값
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    # 2. 제목
    title = models.CharField(max_length=100)
    # 3. 유저
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    # 4. 카테고리
    cate = models.TextField()
    # 5. 기술 스택
    technology_stacks = models.ManyToManyField(TechnologyStack, blank=True)  
    # 6. 작업 환경
    env = models.ManyToManyField(Env, blank=True)
    # 7. 요구사항
    Exp_require = models.TextField()
    # 8. 선호 직종
    occupation = models.ManyToManyField(Occupation, blank=True)
    # 9. 프로젝트 설명 
    Project_Description=models.TextField()
    # 10. 이미지
    image = models.ImageField(upload_to='recommend_images/', null=True, blank=True)
    def __str__(self):
        return self.title