from django.urls import path
from .views import OrderCreateView,UserOrderListView
from .views_dashboard import DashboardStatsView

urlpatterns = [
    path('create/', OrderCreateView.as_view(), name='order-create'),
    path("my-orders/", UserOrderListView.as_view(), name="user-orders"),
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
]
