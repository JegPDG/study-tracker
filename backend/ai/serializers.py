from rest_framework import serializers
from .models import ChatMessage, Conversation, SummarizedNote

class ChatMessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ChatMessage
    fields =['id','conversation','user','role','content','model_name','response_meta','created_at']
    read_only_fields = ['id', 'created_at', 'response_meta']

class ConversationSerializer(serializers.ModelSerializer):
  messages = ChatMessageSerializer(many=True, read_only=True)

  class Meta:
    model = Conversation
    fields = ['id', 'user', 'title', 'created_at', 'messages']

class ConversationListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Conversation
    fields = ['id', 'title', 'created_at']

class SummarizedNoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = SummarizedNote
    fields = ['id', 'note', 'summary_content', 'generated_at', 'model_used']