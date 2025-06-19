from django.shortcuts import render
from rest_framework import generics
from .models import User  # your custom or default User
from .serializers import RegisterSerializer


# Create your views here.
class RegisterUser(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

