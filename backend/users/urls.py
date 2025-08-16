from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterUser, UserAPIViewSet, UserUpdateView, ChangePasswordView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('user/', UserAPIViewSet.as_view(), name='user_view'),
    path('user/update/', UserUpdateView.as_view(), name='user-update'),
    path('user/change-password/', ChangePasswordView.as_view(), name='change-password'),
    
]