from django.urls import path
from .views import RegisterView,UserMeView,LogoutView,PasswordResetRequestView,ResetPasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', UserMeView.as_view(), name='user_me'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('reset-password/<int:uid>/<str:token>/', ResetPasswordView.as_view(), name='reset-password'),
]
