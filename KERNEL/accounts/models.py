from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password
import datetime

class UserTBManager(BaseUserManager):
    def create_user(self, userId, password=None, **extra_fields):
        if not userId:
            raise ValueError('The User ID must be set')
        user = self.model(userId=userId, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userId, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('userDate', datetime.date.today())
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(userId, password, **extra_fields)

class UserTB(AbstractBaseUser, PermissionsMixin):
    userId = models.CharField(max_length=100, unique=True)
    userPw = models.CharField(max_length=200)
    userName = models.CharField(max_length=100)
    userAddress = models.CharField(max_length=200)
    userPhone = models.CharField(max_length=20)
    userEmail = models.EmailField(max_length=100)
    userDate = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserTBManager()

    USERNAME_FIELD = 'userId'
    REQUIRED_FIELDS = ['userName', 'userEmail']
    
    @property
    def password(self):
        return self.userPw

    @password.setter
    def password(self, value):
        self.userPw = value
        
    def set_password(self, raw_password):
        self.userPw = make_password(raw_password)  # 암호화된 비밀번호를 userPw에 저장
        self._password = raw_password

    def __str__(self):
        return self.userName
