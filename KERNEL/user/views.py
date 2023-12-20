from django.shortcuts import render, redirect
from .models import UserModel
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib import messages

def sign_up_view(request):
    if request.method == 'GET':
        return render(request, 'user/signup.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        password2 = request.POST.get('password2', None)
        bio = request.POST.get('bio', None)
        
        if password != password2:
            messages.error(request, '비밀번호가 일치하지 않습니다.')
            return render(request, 'user/signup.html')

        # Check if username already exists
        if UserModel.objects.filter(username=username).exists():
            messages.error(request, '이미 존재하는 사용자입니다.')
            return render(request, 'user/signup.html')

        new_user = UserModel()
        new_user.username = username
        new_user.set_password(password)  # 비밀번호를 해싱하여 저장
        new_user.bio = bio
        new_user.save()
        return redirect('sign-in')

def sign_in_view(request):
    if request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)

        # 사용자 인증
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')  # 로그인 성공시 홈페이지로 리다이렉트
        else:
            return render(request, 'user/signin.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'user/signin.html')