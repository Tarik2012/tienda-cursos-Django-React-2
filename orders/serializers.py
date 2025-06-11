from rest_framework import serializers
from courses.models import Course
from .models import Order, OrderItem

# Serializer para los ítems del carrito
class OrderItemSerializer(serializers.Serializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    quantity = serializers.IntegerField(min_value=1)

    def validate(self, data):
        # Aquí puedes hacer validaciones extra si quieres
        return data

# Serializer para crear el pedido completo
class OrderCreateSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True)  # Lista de ítems del carrito

    def create(self, validated_data):
        user = self.context["request"].user  # Usuario autenticado
        items_data = validated_data.pop("items")

        # Creamos el pedido vacío con total en 0
        order = Order.objects.create(user=user, total=0)

        total = 0
        for item_data in items_data:
            course = item_data["course"]
            quantity = item_data["quantity"]
            price = course.price  # Usamos el precio actual del curso

            OrderItem.objects.create(
                order=order,
                course=course,
                quantity=quantity,
                price=price
            )

            total += price * quantity

        # Guardamos el total calculado
        order.total = total
        order.save()
        return order
    

class OrderItemDetailSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["course_title", "quantity"]    


class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "total", "created_at", "items"]