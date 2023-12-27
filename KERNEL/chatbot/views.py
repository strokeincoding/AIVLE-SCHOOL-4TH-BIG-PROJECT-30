from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
import my_settings

class ChatBotAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get("message")
        client = OpenAI(api_key=my_settings.OPEN_API_KEY)

        assistant = client.beta.assistants.retrieve("asst_ohtAOgTkqLBcWjruvjPVX8sa")

        # OpenAI GPT 챗봇과의 통신 로직
        thread = client.beta.threads.create()
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,  # 예시 assistant ID
            instructions="",
        )

        # 챗봇 응답을 받을 때까지 대기
        while True:
            if run.status == "completed":
                break
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        bot_reply = messages.data[0].content[0].text.value

        return Response({"reply": bot_reply})