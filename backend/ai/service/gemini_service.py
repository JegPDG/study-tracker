from google import genai
from google.genai import types
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

@api_view(['POST'])
@permission_classes([AllowAny])
def user_message(request):
  # Send User Message
  message=request.data.get('message')

  if not message:
    return Response({'detail': 'Missing message in request body'}, status=status.HTTP_400_BAD_REQUEST)

  try:
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        config=types.GenerateContentConfig(
          system_instruction="""
            You are a study assistant. When responding, format your answers in Markdown. 
              Use:
              - **Bold** for emphasis
              - Lists for structured info
              - Triple backticks for code examples

              Example:
              **Topic:** Web Development
              - HTML is for structure
              - CSS is for style
              - JS is for logic
            """
        ),
        contents= message
    )

    text = getattr(response, "text", None) or str(response)
    return Response({
      "response" : text
    })
  except Exception as e:
    logger.error(f"AI did not respond")
    return Response({
      'error': "Message failed",
    })
  
  