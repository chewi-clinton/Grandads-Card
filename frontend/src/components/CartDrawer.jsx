"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { lines, isOpen, close, removeLine, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={close}>
      <div
        className="flex h-full w-full max-w-sm flex-col bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold font-heading">Your cart</h2>
          <button onClick={close} aria-label="Close cart" className="text-2xl leading-none">
            &times;
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-neutral-400">
              <path d="M12 2c2.761 0 5 2.089 5 4.667V8h2.2a.79.79 0 0 1 .8.778v12.444a.79.79 0 0 1-.8.778H4.8a.789.789 0 0 1-.8-.778V8.778A.79.79 0 0 1 4.8 8H7V6.667C7 4.09 9.239 2 12 2z" />
            </svg>
            <p className="text-sm text-neutral-500">Your cart is empty</p>
            <Link
              href="/"
              onClick={close}
              className="inline-block rounded bg-accent px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-border bg-white">
                    <Image src={line.image} alt={line.title} fill className="object-contain" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{line.title}</p>
                    {line.variantTitle !== "Default Title" && (
                      <p className="text-xs text-neutral-500">{line.variantTitle}</p>
                    )}
                    <p className="text-sm">
                      {line.quantity} &times; {formatPrice(line.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeLine(line.variantId)}
                    className="self-start text-xs text-neutral-400 hover:text-accent"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-3 flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Link
                href="/cart"
                onClick={close}
                className="block w-full rounded bg-[#1a1a1a] py-3 text-center text-sm font-bold text-white hover:opacity-90"
              >
                View cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
