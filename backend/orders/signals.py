from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import OrderItem

@receiver([post_save, post_delete], sender=OrderItem)
def update_order_total(sender, instance, **kwargs):
    order = instance.order
    total = sum(item.get_subtotal() for item in order.items.all())
    print(f"🧾 Recalculando total del pedido #{order.id}: {total}")  # 👈 línea clave
    order.total = total
    order.save()
