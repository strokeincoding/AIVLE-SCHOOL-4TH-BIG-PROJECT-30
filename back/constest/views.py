from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import User
from Recommend.models import Recommend
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
# Create your views here.
def jaccard_similarity(set1, set2):
    intersection = len(set(set1).intersection(set(set2)))
    union = len(set(set1).union(set(set2)))
    return intersection / union if union != 0 else 0

def make_df(user_id):
    recommends = Recommend.objects.prefetch_related('occupation', 'technology_stacks').all()
    job = []
    for rec in recommends :
        occupations = [occ.occupation_name for occ in rec.occupation.all()]
        tech_stacks = [tech.stack_name for tech in rec.technology_stacks.all()]
        job.append({
            'id' : rec.id,
            'occupation' : occupations,
            'env' : rec.env,
            'required_skills' : tech_stacks,
        })
  
    member = {
        'occupation' : [occ.occupation_name for occ in user_id.occupation.all()],
        'env' : [env.env_name for env in user_id.env.all()],
        'skills': ' '.join([tech.stack_name.lower() for tech in user_id.technology_stacks.all()]),
    }
    
    job_post_df = pd.DataFrame(job)
    job_post_df['required_skills'] = job_post_df['required_skills'].apply(lambda x: ' '.join(x).lower())
    
    vectorizer = CountVectorizer()
    job_post_skill_vector = vectorizer.fit_transform(job_post_df['required_skills'])
    member_skill_vector = vectorizer.transform([member['skills']])
    
    cosine_sim_skills = cosine_similarity(member_skill_vector, job_post_skill_vector)

    def calculate_final(role_weight = 0.5, skill_weight = 0.2, env_weight= 0.2):
        member_role = member['occupation']
        member_env = member['env'][0]

        final_scores = []

        for job_idx, job_row in job_post_df.iterrows():
            role_score = jaccard_similarity(member_role, job_row['occupation'])
            env_score = jaccard_similarity([member_env], [job_row['env']])
            skill_score = cosine_sim_skills[0, job_idx]

            total_score = (role_score * role_weight) + (skill_score * skill_weight) + (env_score * env_weight)
            if total_score >= 0.1:
                final_scores.append((job_idx, total_score))

        final_scores = sorted(final_scores, key=lambda x: x[1], reverse=True)
        job_indices = [i[0] for i in final_scores]
        
        return job_post_df.iloc[job_indices]

    return calculate_final()



class Contest(APIView):
    def get(self, request, *args, **kwargs):
        nickname = request.query_params.get('nickname')
        if not nickname:
            return Response({"error": "사용자 닉네임이 제공되지 않았습니다."}, status=400)

        # 닉네임을 사용하여 사용자 데이터 검색
        try:
            user = get_object_or_404(User, nickname=nickname)
        except User.DoesNotExist:
            return JsonResponse({"error": "사용자를 찾을 수 없습니다."}, status=404)
        data = make_df(user)
        recommend_ids = data['id'].to_list()
        
        result_recommend = []
        for rec_id in recommend_ids:
            recommend = get_object_or_404(Recommend, id=rec_id)
            result_recommend.append({
                'id' : rec_id,
                'title' : recommend.title,
                'cate' : recommend.cate,
                'Exp_require' : recommend.Exp_require,
                'Description' : recommend.Project_Description,
                'image': recommend.image.url if recommend.image else None,
            })
        
        return Response({'recommend_post_ids' :result_recommend})


