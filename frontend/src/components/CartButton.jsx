"use client";

import { useCart } from "@/lib/cart-context";
import { CartIcon } from "./icons";

export function CartButton() {
  const { totalQuantity, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
    >
      <CartIcon />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
