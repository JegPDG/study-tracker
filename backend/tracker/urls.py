from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import SubjectsViewSet, SubjectDashboardViewSet

urlpatterns = [
  path('', views.index),
   path('dashboard/subjects/', SubjectDashboardViewSet.as_view(), name='subject-dashboard'),
]

router = DefaultRouter()
router.register('subject', views.SubjectsViewSet)
router.register('note', views.NotesViewSet)


urlpatterns += router.urls