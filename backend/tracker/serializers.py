from .models import Subject, Notes
from rest_framework import serializers

class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = [
      'subject',
      'title',
      'content',
      'created_at',
      'updated_at',
    ]

class SubjectSerializer(serializers.ModelSerializer):
  notes = NoteSerializer(many=True, read_only=True)
  
  class Meta:
    model = Subject
    fields = [
      'name',
      'description',
      'user',
      'created_at',
      'notes'
    ]

