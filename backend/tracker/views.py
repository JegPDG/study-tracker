from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from .models import User, Subject, Notes
from tracker.serializers import SubjectSerializer, NoteSerializer

# Create your views here.

def index(request):
  return JsonResponse({'message':'Welcome Bithc'})

class SubjectsViewSet(viewsets.ModelViewSet):
  queryset = Subject.objects.all()
  serializer_class = SubjectSerializer

  # def get_queryset(self):
  #   return Response()

class NotesViewSet(viewsets.ModelViewSet):
  queryset = Notes.objects.all()
  serializer_class = NoteSerializer



  