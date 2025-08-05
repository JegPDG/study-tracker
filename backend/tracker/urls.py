from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import SubjectsViewSet, SubjectDashboardViewSet, NoteDashboardView

urlpatterns = [
  path('', views.index),
  path('dashboard/subjects/', SubjectDashboardViewSet.as_view(), name='subject-dashboard'),
  path('dashboard/notes/',  NoteDashboardView.as_view(), name='note-dashboard'),
]

router = DefaultRouter()
router.register('subject', views.SubjectsViewSet)
router.register('note', views.NotesViewSet)


urlpatterns += router.urls