from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
import my_settings

client = OpenAI(api_key= my_settings.OPEN_API_KEY)

def chatGPT(ask):
    keywords = {}
    for a in ask:
    # mandal = f'{query}로/으로 취업하기 준비해야 할 기술 스택, 문제해결 능력, soft skill , 트렌드를  설명과 예시를 생략하고 간략하게 짧은 키워드로만 알려주고 각 키워드를 세부적인 8가지 설명과 예시를 생략하고 간략하게 짧은 키워드로 알려줘'
        mandal = f'프론트엔드 개발자로/으로 취업하기 준비해야 할 {a} 8가지를 설명과 예시를 생략하고 간략하게 짧은 키워드로 예시처럼 알려줘 출력 형태 1.키워드1  2. 키워드2  3.키워드3 4.키워드4 5.키워드5 6.키워드6 7.키워드7 8.키워드8'
        completion = client.chat.completions.create(model="gpt-3.5-turbo",
        messages = [{"role": "user", "content": mandal}],
        temperature=0)
        #print(completion)
        #result = completion.choices[0].message.content
        content = completion.choices[0].message.content
        lines = content.split('\n')
        keywords[a] = [line.split('.', 1)[-1].strip() for line in lines if line]
    return keywords

class OpenAIView(APIView):
    def get(self, request, *args, **kwargs):
        ask = ['기술 스택', '문제해결 능력', 'soft skill' , '트렌드']
        data = chatGPT(ask)
        return Response(data)
        

        