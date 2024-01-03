from django.db import models
from user.models import User

class Crawling(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    title = models.CharField(max_length=100)
    body = models.TextField()
    image = models.URLField(null=True, blank=True)
    url = models.URLField(null=True)
    like_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title

class UserCrawlingLike(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    crawling = models.ForeignKey(Crawling, on_delete = models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'crawling')
    
    def __str__(self):
        return f"{self.user.nickname} likes {self.crawling.title}"
