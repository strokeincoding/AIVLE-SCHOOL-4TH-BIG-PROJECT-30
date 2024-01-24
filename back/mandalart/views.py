from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
import my_settings
from user.models import User

client = OpenAI(api_key=my_settings.OPEN_API_KEY)

def chatGPT(ask, user_occupations):
    keywords = {}
    # 사용자의 직업 이름을 가져옴
    matching_occupation_names = [occupation.occupation_name for occupation in user_occupations]

    for a in ask:
        occupation_names_str = ", ".join(matching_occupation_names)
        
        mandal = f'{occupation_names_str}로/으로 취업하기 준비해야 할 {a} 8가지를 설명과 예시를 생략하고 간략하게 짧은 키워드로 예시처럼 알려줘 출력 형태 1.키워드1 2. 키워드2 3.키워드3 4. 키워드4 5.키워드5 6. 키워드6 7.키워드7 8. 키워드8'
        completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": mandal}], temperature=0)
        content = completion.choices[0].message.content
        lines = content.split('\n')
        keywords[a] = [line.split('.', 1)[-1].strip() for line in lines if line]
    keywords['job'] = occupation_names_str
    return keywords

class OpenAIView(APIView):
    def get(self, request, *args, **kwargs):
        ask = ['기술 스택', '문제해결 능력', 'soft skill', '트렌드']
        
        # URL에서 사용자 닉네임 추출
        nickname = request.query_params.get('nickname')
        if not nickname:
            return Response({"error": "사용자 닉네임이 제공되지 않았습니다."}, status=400)

        # 닉네임을 사용하여 사용자 데이터 검색
        try:
            user = get_object_or_404(User, nickname=nickname)
            user_occupations = user.occupation.all()
        except User.DoesNotExist:
            return JsonResponse({"error": "사용자를 찾을 수 없습니다."}, status=404)

        data = chatGPT(ask, user_occupations)
        return Response(data)
