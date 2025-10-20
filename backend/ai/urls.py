from django.urls import path, include
from .service.gemini_service import user_message

urlpatterns = [
  path("generate", user_message, name='user_message')
]