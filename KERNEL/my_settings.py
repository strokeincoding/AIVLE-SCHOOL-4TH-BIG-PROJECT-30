from openai import OpenAI

DATABASES = { 
	'default': { 
    	'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'big_project2', 
        'USER': 'root', 
        'PASSWORD': '1234', 
        'HOST': '127.0.0.1', 
        'PORT': '3306', 
     }
}

SECRET_KEY = 'django-insecure-rgjvrok3^!pfx8jh+g5e%p10@@+s&^73^+a!^f@&-p619di(4t'

OPEN_API_KEY = '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'
