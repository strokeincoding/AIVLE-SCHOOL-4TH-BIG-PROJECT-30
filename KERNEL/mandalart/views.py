from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
import my_settings
from user.models import User, Occupation

client = OpenAI(api_key=my_settings.OPEN_API_KEY)

def chatGPT(ask, user):
    keywords = {}
    # 사용자가 선택한 직업(들) 검색
    user_occupations = user.occupation.all()
    for a in ask:
        # 사용자가 선택한 직업의 ID를 검색
        user_occupation_ids = [occupation.id for occupation in user_occupations]
            
        # 해당 직업 ID와 일치하는 직업 이름 검색
        matching_occupations = Occupation.objects.filter(id__in=user_occupation_ids)
        matching_occupation_names = [occupation.occupation_name for occupation in matching_occupations]
            
        occupation_names_str = ", ".join(matching_occupation_names)
            
        mandal = f'{occupation_names_str}로/으로 취업하기 준비해야 할 {a} 8가지를 설명과 예시를 생략하고 간략하게 짧은 키워드로 예시처럼 알려줘 출력 형태 1.키워드1 / 2. 키워드2'
        completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": mandal}])
        content = completion.choices[0].message.content
        lines = content.split('\n')
        keywords[a] = [line.split('.', 1)[-1].strip() for line in lines if line]
    return keywords

class OpenAIView(APIView):
    def get(self, request, *args, **kwargs):
        ask = ['기술 스택', '문제해결 능력', 'soft skill', '트렌드']
        
        # URL에서 사용자 ID 추출
        user_id = request.query_params.get('nickname')
        if not user_id:
            return Response({"error": "사용자 ID가 제공되지 않았습니다."}, status=400)

        # 사용자 ID로 사용자 데이터 검색
        try:
            user_data = get_object_or_404(User, id=user_id)
        except User.DoesNotExist:
            return JsonResponse({"error": "사용자를 찾을 수 없습니다."}, status=404)

        data = chatGPT(ask, user_data)
        return Response(data)
