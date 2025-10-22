from google import genai
from google.genai import types
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging
from django.db import transaction

from ai.models import ChatMessage, Conversation
from ai.serializers import ChatMessageSerializer

logger = logging.getLogger(__name__)

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()




@api_view(['POST'])
@permission_classes([AllowAny])
def user_message(request):
  # Send User Message
  message=request.data.get('message')
  conversation_id = request.data.get('conversation')
  user = request.user if request.user and request.user.is_authenticated else None

  if not message:
    return Response({'detail': 'Missing message in request body'}, status=status.HTTP_400_BAD_REQUEST)

  try:
    with transaction.atomic():
      conversation = None
      if conversation_id:
        conversation = Conversation.objects.filter(id=conversation_id).first()
      if not conversation:
        conversation = Conversation.objects.create(user=user, title=message[:50])
    
      user_msg = ChatMessage.objects.create(
        conversation=conversation,
        user=user,
        role='user',
        content=message,
        model_name='gemini-2.5-flash'
      )

      response = client.models.generate_content(
          model="gemini-2.5-flash", 
          config=types.GenerateContentConfig(
            system_instruction="""
              You are a study assistant. When responding, format your answers in Markdown. 
                Use:
                - **Bold** for emphasis
                - Lists for structured info
                - Triple backticks for code examples
              """
          ),
          contents= message
      )

      text = getattr(response, "text", None) or str(response)

      asssitant_msg = ChatMessage.objects.create(
        conversation=conversation,
        user=None,
        role='assistant',
        content=text,
        model_name="gemini-2.5-flash",
        response_meta={'raw': str(response)}
      )

      serialized = ChatMessageSerializer(asssitant_msg)
      return Response(serialized.data, status=status.HTTP_200_OK)

  except Exception as e:
    logger.error(f"AI did not respond")
    return Response({
      'error': "Message failed", 
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

