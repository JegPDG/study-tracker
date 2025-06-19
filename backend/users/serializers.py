from .models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = [
      'username',
      'email',
      'passowrd',
    ]
    extrakwargs = {'password':{'write-only': True}}

  def create(self, validated_data):
    user = User.objects.all()
    return user
  