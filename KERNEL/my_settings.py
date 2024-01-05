from openai import OpenAI

DATABASES = { 
	'default': { 
    	'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'new', 
        'USER': 'root', 
        'PASSWORD': 'aivle', 
        'HOST': '127.0.0.1', 
        'PORT': '3306', 
        'OPTIONS' : {
            'charset' : 'utf8mb4'
        }
     }
}

SECRET_KEY = 'django-insecure-rgjvrok3^!pfx8jh+g5e%p10@@+s&^73^+a!^f@&-p619di(4t'

OPEN_API_KEY = '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'
