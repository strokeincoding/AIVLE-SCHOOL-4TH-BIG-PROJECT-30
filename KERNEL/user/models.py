from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, nickname, name, cover_letter=None, occupation=None, technology_stacks=None,password=None):
        if not email:
            raise ValueError('must have user email')
        if not nickname:
            raise ValueError('must have user nickname')
        if not name:
            raise ValueError('must have user name')
        user = self.model(
            email = self.normalize_email(email),
            nickname = nickname,
            name = name,
            cover_letter = cover_letter,  # 자기소개서 추가
            occupation = occupation       # 선호 직업 추가
        )
        user.set_password(password)
        user.save(using=self._db)
        
        if technology_stacks:
            user.technology_stacks.set(technology_stacks)
            user.save(using=self._db)
            
        return user

    # 관리자 user 생성
    def create_superuser(self, email, nickname, name, cover_letter=None, occupation=None, technology_stacks=None,password=None):
        user = self.create_user(
            email,
            password = password,
            nickname = nickname,
            name = name,
            cover_letter=cover_letter,  # 자기소개서 추가
            occupation=occupation       # 직업 추가
        )
        user.is_staff = True  # 관리자 사이트 접근 권한
        user.is_superuser = True  # 모든 권한 부여
        # 기술 스택 설정
        if technology_stacks:
            user.technology_stacks.set(technology_stacks)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100, null=False, blank=False)
    cover_letter = models.TextField(default='', blank=True, null=True)  # 자기소개서 추가
    occupation = models.CharField(default='', max_length=100, blank=True, null=True)  # 선호 직업 추가
    technology_stacks = models.ManyToManyField('TechnologyStack', blank=True) # 기술 스택 추가(다대다 필드)
    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)    
    is_staff = models.BooleanField(default=False)
    
    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 nickname으로 설정
    USERNAME_FIELD = 'nickname'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['email', 'name']

    def __str__(self):
        return self.nickname
    
    def has_perm(self, perm, obj=None):
        return True


    def has_module_perms(self, app_label):
        return True
    
class TechnologyStack(models.Model):
    stack_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.stack_name