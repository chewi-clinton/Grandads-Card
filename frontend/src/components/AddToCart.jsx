"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function AddToCart({ product }) {
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const available = variant?.available ?? false;

  function handleAdd() {
    if (!variant) return;
    addLine(
      {
        productHandle: product.handle,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: product.image,
      },
      quantity
    );
  }

  return (
    <div className="space-y-4">
      {product.variants.length > 1 && (
        <select
          value={variantId}
          onChange={(e) => setVariantId(Number(e.target.value))}
          className="w-full rounded-[5px] border border-border p-3 text-sm"
        >
          {product.variants.map((v) => (
            <option key={v.id} value={v.id} disabled={!v.available}>
              {v.title} {!v.available ? "(Sold out)" : ""}
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-3">
        <div className="flex items-center rounded-[5px] border border-foreground">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-[42px] w-10 items-center justify-center rounded-l-[5px] bg-foreground text-white"
          >
            &minus;
          </button>
          <span className="flex h-[42px] w-12 items-center justify-center text-sm">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-[42px] w-10 items-center justify-center rounded-r-[5px] bg-foreground text-white"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!available}
          className="flex-1 rounded-[5px] border border-foreground bg-white/90 text-[13.8px] font-bold text-foreground hover:bg-foreground hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {available ? "Add to cart" : "Sold out"}
        </button>
      </div>
    </div>
  );
}
