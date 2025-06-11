from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import OrderCreateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Order
from .serializers import OrderListSerializer
 

class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]  # ✅ Esta línea es clave
    authentication_classes = [JWTAuthentication]   

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            return Response({"message": "Pedido creado con éxito"})
        return Response(serializer.errors, status=400)
    # vista panel de usuarios con historial de compra
class UserOrderListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = OrderListSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at') 
