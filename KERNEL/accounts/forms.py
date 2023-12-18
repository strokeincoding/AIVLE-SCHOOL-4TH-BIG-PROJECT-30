from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import UserTB

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = UserTB
        fields = ['userId', 'userPw', 'userName', 'userAddress', 'userPhone', 'userEmail', 'userDate']