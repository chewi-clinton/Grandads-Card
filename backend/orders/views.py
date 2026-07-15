from rest_framework import viewsets

from products.permissions import IsAdminOrReadOnly

from .models import Order
from .serializers import OrderListSerializer, OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related("items").all()
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ["status"]

    def get_serializer_class(self):
        if self.action == "list":
            return OrderListSerializer
        return OrderSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return qs
        if user.is_authenticated:
            return qs.filter(customer=user)
        return qs.none()
