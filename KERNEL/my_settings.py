DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # 사용할 데이터베이스 엔진
        'NAME': 'aivle', # 데이터베이스 이름 
        'USER': 'root', # 접속할 Database 계정 아이디 ex) root
        'PASSWORD': 'aivle',  # 접속할 Database 계정 비밀번호 ex) 1234
        'HOST': 'localhost',   # host는 로컬 환경에서 동작한다면 ex) localhost 192.168.56.1
        'PORT': '3306', # 설치시 설정한 port 번호를 입력한다. ex) 3306ㅇㅇ
    }
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-rgjvrok3^!pfx8jh+g5e%p10@@+s&^73^+a!^f@&-p619di(4t'
