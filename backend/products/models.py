from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    handle = models.SlugField(unique=True, max_length=120)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="categories/", max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["title"]

    def __str__(self):
        return self.title


class Product(models.Model):
    handle = models.SlugField(unique=True, max_length=255)
    title = models.CharField(max_length=500)
    description_html = models.TextField(blank=True)
    vendor = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=200, blank=True)
    tags = ArrayField(models.CharField(max_length=100), blank=True, default=list)
    price = models.PositiveIntegerField(help_text="Price in cents")
    compare_at_price = models.PositiveIntegerField(null=True, blank=True, help_text="Compare-at price in cents")
    available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    image = models.ImageField(upload_to="products/", max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["handle"]),
            models.Index(fields=["category"]),
            models.Index(fields=["available"]),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.handle:
            self.handle = slugify(self.title)
        super().save(*args, **kwargs)


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    title = models.CharField(max_length=200, default="Default")
    sku = models.CharField(max_length=100, blank=True)
    price = models.PositiveIntegerField(help_text="Price in cents")
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.title} — {self.title}"
