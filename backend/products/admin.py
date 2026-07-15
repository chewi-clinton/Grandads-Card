from django.contrib import admin

from .models import Category, Product, ProductVariant


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "vendor", "price", "available", "category"]
    list_filter = ["available", "category", "vendor"]
    search_fields = ["title", "vendor", "handle"]
    prepopulated_fields = {"handle": ("title",)}
    inlines = [ProductVariantInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["title", "handle"]
    prepopulated_fields = {"handle": ("title",)}
