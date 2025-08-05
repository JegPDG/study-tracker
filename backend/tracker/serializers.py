from .models import Subject, Notes
from rest_framework import serializers

class SubjectPreviewSerializer(serializers.ModelSerializer):
  note_count = serializers.IntegerField()
  
  class Meta:
    model= Subject
    fields = ['id', 'name', 'note_count', 'created_at']

class NoteDashBoardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = ['id', 'title', 'updated_at']


class NoteSerializer(serializers.ModelSerializer):
  subject = SubjectPreviewSerializer(read_only=True)
  subject_id = serializers.PrimaryKeyRelatedField(
    queryset = Subject.objects.all(),
    write_only = True,
    source = 'subject'
  )

  class Meta:
    model = Notes
    fields = '__all__'
    read_only_fields = ['id']

class NotePreviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = ['id', 'title', 'created_at', 'content' ]

class SubjectSerializer(serializers.ModelSerializer):
  notes = NotePreviewSerializer(many=True, read_only=True)
   
  class Meta:
    model = Subject
    fields = '__all__'
    read_only_fields = ['user']

