from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import CustomUserCreationForm  # 사용자 정의 폼 사용

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # 로그인 성공시 홈페이지로 리다이렉트
        else:
            # 로그인 실패시 에러 메시지 반환
            return render(request, 'accounts/login.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'accounts/login.html')

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)  # 수정된 부분
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = CustomUserCreationForm()  # 수정된 부분
    return render(request, 'accounts/register.html', {'form': form})

# 추가적인 뷰들...
