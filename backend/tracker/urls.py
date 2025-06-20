from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import SubjectsViewSet

urlpatterns = [
  path('', views.index),
  
]

router = DefaultRouter()
router.register('subject', views.SubjectsViewSet)
router.register('note', views.NotesViewSet)


urlpatterns += router.urls