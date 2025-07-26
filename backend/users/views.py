from django.shortcuts import render
from rest_framework import generics
from .models import User  # your custom or default User
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class RegisterUser(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

