from django.db import models
from user.models import User

class Crawling(models.Model):
    # 1. 아이디
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    # 2. 제목
    title = models.CharField(max_length=100)
    # 3. 내용
    body = models.TextField()
    # 4. 이미지
    image = models.URLField(null=True, blank=True)
    # 5. 링크
    url = models.URLField(null=True)
    # 6. 좋아요 수 
    like_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title

class UserCrawlingLike(models.Model):
    # 사용자
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    # 크롤링
    crawling = models.ForeignKey(Crawling, on_delete = models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'crawling')
    
    def __str__(self):
        return f"{self.user.nickname} likes {self.crawling.title}"
