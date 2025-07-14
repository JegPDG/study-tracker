from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import User, Subject, Notes
from tracker.serializers import SubjectSerializer, NoteSerializer

# Create your views here.

def index(request):
  return JsonResponse({'message':'Welcome Bithc'})

class SubjectsViewSet(viewsets.ModelViewSet):
  queryset = Subject.objects.none()
  serializer_class = SubjectSerializer
  permission_classes = [permissions.IsAuthenticated]
  lookup_field = 'id'

  def get_queryset(self):
    return self.request.user.subjects.all()
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class NotesViewSet(viewsets.ModelViewSet):
  queryset = Notes.objects.none()
  serializer_class = NoteSerializer
  permission_classes = [permissions.IsAuthenticated]
  lookup_field = 'id'

  def get_queryset(self):
    return Notes.objects.filter(subject__user=self.request.user)
  
  def perform_create(self, serializer):
    subject_id = self.request.data.get('subject')
    serializer.save(subject_id=subject_id)



  