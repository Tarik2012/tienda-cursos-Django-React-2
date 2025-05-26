from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from django.db.models.functions import Cast
from django.db.models import DecimalField
from orders.models import Order, OrderItem

class DashboardStatsView(APIView):
    permission_classes = []  # Puedes poner [IsAuthenticated] si quieres protegerlo

    def get(self, request):
        # Total global
        total_orders = Order.objects.count()
        total_income = Order.objects.aggregate(total=Sum('total'))['total'] or 0

        # 📊 Pedidos por mes
        monthly_orders_qs = (
            Order.objects
            .annotate(month=TruncMonth('created_at'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )
        monthly_orders = [
            {"month": item["month"].strftime('%Y-%m'), "count": item["count"]}
            for item in monthly_orders_qs
        ]
        # 💵 Ingresos por mes
        monthly_income_qs = (
            Order.objects
            .annotate(month=TruncMonth('created_at'))
            .values('month')
            .annotate(total=Sum(Cast('total', DecimalField(max_digits=10, decimal_places=2))))
            .order_by('month')
        )
        monthly_income = [
            {"month": item["month"].strftime('%Y-%m'), "total": float(item["total"])}
            for item in monthly_income_qs
        ]

        # 🔝 Top 5 cursos más vendidos
        top_courses = (
            OrderItem.objects
            .values("course__title")
            .annotate(sold=Sum("quantity"))
            .order_by("-sold")[:5]
        )

        return Response({
            "total_orders": total_orders,
            "total_income": total_income,
            "monthly_orders": monthly_orders,
            "monthly_income": monthly_income,
            "top_courses": top_courses,
        })
