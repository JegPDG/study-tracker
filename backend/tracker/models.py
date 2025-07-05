from django.db import models
from users.models import User
import uuid

# Create your models here.
class Subject(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField(blank=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subjects')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name
  
class Notes(models.Model):
  subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
  title = models.CharField(max_length=100)
  content = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  def __str__(self):
    return self.title
  

  

