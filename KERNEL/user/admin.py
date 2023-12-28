from django.contrib import admin
from .models import TechnologyStack, Occupation, Env

# Register your models here.
# TechnologyStack,Occupation, Env모델을 관리자 사이트에 등록합니다.
admin.site.register(TechnologyStack)
admin.site.register(Occupation)
admin.site.register(Env)