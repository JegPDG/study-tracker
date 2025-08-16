from django.shortcuts import render
from rest_framework import generics, views, viewsets, permissions, status
from .models import User  # your custom or default User
from .serializers import RegisterSerializer, UserSerializer, UserUpdateSerializer, ChangePasswordSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.
class RegisterUser(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

class UserAPIViewSet(views.APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request):
      serializer = UserSerializer(request.user)
      return Response(serializer.data)

class UserUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class ChangePasswordView(views.APIView):
  permission_classes = [permissions.IsAuthenticated]

  def post(self, request):
      serializer = ChangePasswordSerializer(data=request.data)
      if serializer.is_valid():
          user = request.user
          if not user.check_password(serializer.validated_data['old_password']):
              return Response({'old_password': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)
          user.set_password(serializer.validated_data['new_password'])
          user.save()
          return Response({'detail': 'Password updated successfully.'})
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)