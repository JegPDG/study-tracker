from .models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(
    write_only=True,
    required=True,
    validators=[validate_password],
    style={'input_type': 'password'}
    )

  class Meta: 
    model = User
    fields = [
      'username',
      'email',
      'password',
    ]
    extrakwargs = {'password':{'write-only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data.get('email'),
      password=validated_data['password']
    )
    return user
  