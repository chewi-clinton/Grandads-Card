"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, removeLine, setQuantity, totalPrice } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="text-neutral-600">Browse our collections to find your next box.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Your cart</h1>
      <ul className="divide-y divide-border">
        {lines.map((line) => (
          <li key={line.variantId} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-border bg-white">
              <Image src={line.image} alt={line.title} fill className="object-contain p-2" sizes="80px" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{line.title}</p>
              {line.variantTitle !== "Default Title" && (
                <p className="text-sm text-neutral-500">{line.variantTitle}</p>
              )}
              <p className="text-sm">{formatPrice(line.price)}</p>
            </div>
            <input
              type="number"
              min={1}
              value={line.quantity}
              onChange={(e) => setQuantity(line.variantId, Math.max(1, Number(e.target.value)))}
              className="w-16 rounded border border-border p-2 text-center"
            />
            <button onClick={() => removeLine(line.variantId)} className="text-sm text-neutral-400 hover:text-accent">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="text-xl font-bold">Subtotal</span>
        <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
      </div>
      <button
        disabled
        title="Checkout will be wired up once payment processing is connected in the backend phase"
        className="mt-6 w-full rounded bg-[#1a1a1a] py-4 text-sm font-bold text-white opacity-40"
      >
        Checkout
      </button>
    </div>
  );
}
