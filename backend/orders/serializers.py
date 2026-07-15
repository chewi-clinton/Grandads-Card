from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "variant", "title", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "order_number", "customer", "email", "status", "total", "items", "created_at", "updated_at"]
        read_only_fields = ["order_number", "created_at", "updated_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order


class OrderListSerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(source="items.count", read_only=True)

    class Meta:
        model = Order
        fields = ["id", "order_number", "email", "status", "total", "item_count", "created_at"]
