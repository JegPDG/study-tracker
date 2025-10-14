from django.shortcuts import render
from django.db.models import Count
from django.http import JsonResponse
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import User, Subject, Notes
from tracker.serializers import SubjectSerializer, NoteSerializer, SubjectPreviewSerializer, NotePreviewSerializer, NoteDashBoardSerializer, SubjectDashboardSerializer

# Create your views here.

def index(request):
  return JsonResponse({'message':'Welcome Bithc'})

class SubjectDashboardViewSet(ListAPIView):
  queryset = Subject.objects.none()
  serializer_class = SubjectDashboardSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Subject.objects.filter(user=user).annotate(
      note_count=Count('notes')).order_by('-created_at')

  def list(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = self.get_serializer(queryset, many=True)

    total_subjects = Subject.objects.filter(user=request.user).count()

    return Response({
      'total_subjects' : total_subjects,
      'subjects' : serializer.data,
    })

class NoteDashboardView(ListAPIView):
  serializer_class = NoteSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Notes.objects.filter(subject__user=user).order_by('-updated_at')[:10]

class SubjectsViewSet(viewsets.ModelViewSet):
  queryset = Subject.objects.none()
  serializer_class = SubjectSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = [filters.SearchFilter]
  lookup_field = 'id'
  search_fields = ['name']


  def get_queryset(self):
    return self.request.user.subjects.all()
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class NotesViewSet(viewsets.ModelViewSet):
  queryset = Notes.objects.none()
  serializer_class = NoteSerializer
  permission_classes = [permissions.IsAuthenticated]
  filter_backends = [filters.SearchFilter]
  lookup_field = 'id'
  search_fields = ['title']

  def get_queryset(self):
    return Notes.objects.filter(subject__user=self.request.user)
  

  