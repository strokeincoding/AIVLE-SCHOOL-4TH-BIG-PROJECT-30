from django.contrib import admin
from .models import TechnologyStack, Occupation, Env

# TechnologyStack,Occupation, Env모델을 관리자 사이트에 등록
admin.site.register(TechnologyStack)
admin.site.register(Occupation)
admin.site.register(Env)