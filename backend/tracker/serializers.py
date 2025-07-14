from .models import Subject, Notes
from rest_framework import serializers

class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = '__all__'
    read_only_fields = ['id']

class SubjectSerializer(serializers.ModelSerializer):
  notes = NoteSerializer(many=True, read_only=True)
  
  class Meta:
    model = Subject
    fields = '__all__'
    read_only_fields = ['user']

