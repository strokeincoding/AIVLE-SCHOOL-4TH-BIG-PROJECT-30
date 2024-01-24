from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, nickname, name, occupation=None, technology_stacks=None,password=None, env=None):
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
        )
        user.set_password(password)
        user.save(using=self._db)
        # 기술스택
        if technology_stacks:
            user.technology_stacks.set(technology_stacks)
            user.save(using=self._db)
        # 선호 직종
        if occupation:
            user.occupation.set(occupation)
            user.save(using=self._db)
        # 선호 직종
        if env:
            user.env.set(env)
            user.save(using=self._db)
            
        return user

    # 관리자 user 생성
    def create_superuser(self, email, nickname, name, occupation=None, technology_stacks=None,password=None, env=None):
        user = self.create_user(
            email,
            password = password,
            nickname = nickname,
            name = name,
        )
        user.is_staff = True  # 관리자 사이트 접근 권한
        user.is_superuser = True  # 모든 권한 부여
        # 기술 스택 설정
        if technology_stacks:
            user.technology_stacks.set(technology_stacks)
        user.save(using=self._db)
        # 선호 직종
        if occupation:
            user.occupation.set(occupation)
        user.save(using=self._db)
        if env:
            user.env.set(env)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    # 1. 아이디
    id = models.AutoField(primary_key=True)
    # 2. 이메일
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    # 3. 닉네임
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    # 4. 이름
    name = models.CharField(default='', max_length=100, null=False, blank=False)
    # 5. 희망직종
    occupation = models.ManyToManyField('Occupation', blank=True) 
    # 6. 기술스택
    technology_stacks = models.ManyToManyField('TechnologyStack', blank=True) 
    # 7. 선호환경
    env = models.ManyToManyField('Env', blank=True) 
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

# 기술스택 
class TechnologyStack(models.Model):
    stack_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.stack_name
# 희망직종   
class Occupation(models.Model):
    occupation_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.occupation_name
# 선호환경   
class Env(models.Model):
    env_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.env_name
    
    
