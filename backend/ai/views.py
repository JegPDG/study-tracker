from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework import viewsets, permissions, filters
from .models import Conversation, ChatMessage
from .serializers import ConversationSerializer, ChatMessageSerializer, ConversationListSerializer
from rest_framework.pagination import PageNumberPagination
from google import genai

client = genai.Client()

# Create your views here.
class ConversationView(ListAPIView):
  queryset = Conversation.objects.none()
  serializer_class = ConversationSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Conversation.objects.filter(user=user)


# Use for rendering list of conversation 
class ConversationList(ListAPIView):
  queryset = Conversation.objects.none()
  serializer_class = ConversationListSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Conversation.objects.filter(user=user).order_by('-created_at')

# Use for getting the messages for a specific conversation 
class ChatMessagesInConvoView(ListAPIView):
  queryset = Conversation.objects.none()
  serializer_class = ConversationSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    conversation_id = self.kwargs.get('conversation_id')
    return Conversation.objects.filter(user=user, id=conversation_id )

class ChatMessageVIew(ListAPIView):
  queryset = ChatMessage.objects.none()
  serializer_class = ChatMessageSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return ChatMessage.objects.filter(user=user)

# Summarizer View 

