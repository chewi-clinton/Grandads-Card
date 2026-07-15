from rest_framework import serializers

from .models import Category, Product, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "handle", "title", "description", "image"]


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ["id", "title", "sku", "price", "available"]


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, required=False)
    category_handle = serializers.SlugRelatedField(
        source="category", slug_field="handle", queryset=Category.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "handle",
            "title",
            "description_html",
            "vendor",
            "type",
            "tags",
            "price",
            "compare_at_price",
            "available",
            "category_handle",
            "image",
            "variants",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["handle", "created_at", "updated_at"]

    def create(self, validated_data):
        variants_data = validated_data.pop("variants", [])
        product = Product.objects.create(**validated_data)
        if not variants_data:
            ProductVariant.objects.create(
                product=product, title="Default", price=product.price, available=product.available
            )
        else:
            for variant in variants_data:
                ProductVariant.objects.create(product=product, **variant)
        return product

    def update(self, instance, validated_data):
        validated_data.pop("variants", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ProductListSerializer(serializers.ModelSerializer):
    category_handle = serializers.SlugRelatedField(source="category", slug_field="handle", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "handle",
            "title",
            "vendor",
            "price",
            "compare_at_price",
            "available",
            "category_handle",
            "image",
        ]
