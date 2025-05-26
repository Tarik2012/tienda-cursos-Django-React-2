from django.db import models
from django.conf import settings
from courses.models import Course 
from django.utils import timezone

#modelo Order
class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    created_at = models.DateTimeField(default=timezone.now)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Pedido #{self.id} - {self.user.email} - {self.created_at.date()}"

#Modelo OrderItem    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.course.title}"

    def get_subtotal(self):
        if self.price is None or self.quantity is None:
            return 0
        return self.quantity * self.price
    
    def save(self, *args, **kwargs):
        if self.course and self.price is None:
            self.price = self.course.price  # 👈 Copiamos el precio actual del curso
        super().save(*args, **kwargs)
   
    


