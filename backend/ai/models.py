from django.db import models
import uuid
from users.models import User

# Create your models here.
class Conversation(models.Model):
  id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, )
  user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
  title = models.CharField(max_length=255, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

class ChatMessage(models.Model):
  ROLE_CHOICES = (('user','user'), ('assistant','assistant'))
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, blank=True, null=True, related_name='messages')
  user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
  role = models.CharField(max_length=16, choices=ROLE_CHOICES)
  content = models.TextField()
  model_name = models.CharField(max_length=128, blank=True)
  response_meta = models.JSONField(null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('created_at',)

    