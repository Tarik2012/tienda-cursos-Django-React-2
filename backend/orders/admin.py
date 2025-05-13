from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):  # También puedes usar StackedInline
    model = OrderItem
    extra = 1  # cuántos ítems vacíos aparecen por defecto
    readonly_fields = ("get_subtotal","price")

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total", "created_at")
    list_filter = ("created_at",)
    search_fields = ("user__email",)
    inlines = [OrderItemInline]  # Aquí conectamos los ítems con la orden
    readonly_fields = ("total",)

admin.site.register(OrderItem)  # opcional, si quieres también verlos por separado