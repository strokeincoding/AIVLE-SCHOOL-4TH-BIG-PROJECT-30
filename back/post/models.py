from django.db import models
from user.models import User

class Post(models.Model):
    # 1. 게시글의 id 값
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    # 2. 제목
    title = models.CharField(max_length=100)
    # 3. 작성일
    created_at = models.DateTimeField(auto_now_add=True)
    # 4. 작성자
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    # 5. 본문
    body = models.TextField()
    
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    # 1. 댓글의 id 값
    id = models.AutoField(primary_key=True, null=False, blank=False)
    # 2. 게시글
    post = models.ForeignKey(Post, null=False, blank=False, on_delete=models.CASCADE)
    # 3. 작성자
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    # 4. 작성일
    created_at = models.DateField(auto_now_add=True, null=False, blank=False)
    # 5. 댓글
    comment = models.TextField()

    def __str__(self):
        return self.comment