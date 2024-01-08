from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI
import my_settings

class ChatBotAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get("message")
        thread_id = request.data.get("thread_id")  # 스레드 ID 받기
        client = OpenAI(api_key=my_settings.OPEN_API_KEY)

        assistant = client.beta.assistants.retrieve("asst_ohtAOgTkqLBcWjruvjPVX8sa")

        # 스레드 생성 또는 재사용
        if thread_id:
            thread = client.beta.threads.retrieve(thread_id)
        else:
            thread = client.beta.threads.create()

        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
            instructions="",
        )
        print(thread_id)
        # 챗봇 응답을 받을 때까지 대기
        while True:
            if run.status == "completed":
                break
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        bot_reply = messages.data[0].content[0].text.value

        return Response({"reply": bot_reply, "thread_id": thread.id})  # 스레드 ID 반환
