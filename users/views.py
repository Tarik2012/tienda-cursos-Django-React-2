from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import status

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model

from .models import CustomUser
from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()  # Profesional para vistas generales

# ✅ Vista: Datos del usuario autenticado (GET /me/)
class UserMeView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# ✅ Vista: Registro de usuarios
class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

# ✅ Vista: Logout con refresh token (blacklist)
class LogoutView(APIView):
    authentication_classes = []  # Sin login requerido
    permission_classes = []      # Pública

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

# ✅ Vista: Solicitud de reset de contraseña (envía email con link)
class PasswordResetRequestView(APIView):
    authentication_classes = []  # Sin login requerido
    permission_classes = []      # Pública

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            token = PasswordResetTokenGenerator().make_token(user)
            reset_link = f"http://localhost:5173/reset-password/{user.pk}/{token}"

            # Enviar email (para pruebas en consola)
            send_mail(
                subject="Recupera tu contraseña",
                message=f"Hola, haz clic en este enlace para restablecer tu contraseña:\n\n{reset_link}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
            )

            return Response({"detail": "Password reset link sent to email."})

        except User.DoesNotExist:
            return Response({"detail": "No user found with this email."}, status=status.HTTP_404_NOT_FOUND)


# ✅ Vista: Confirmar reset (guardar nueva contraseña)
class ResetPasswordView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, uid, token):
        password = request.data.get("password")
        if not password:
            return Response({"detail": "Password is required."}, status=400)

        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response({"detail": "Invalid user."}, status=404)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({"detail": "Invalid or expired token."}, status=400)

        user.set_password(password)
        user.save()

        return Response({"detail": "Password has been reset successfully."})
