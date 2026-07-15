"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { resolveProduct } from "@/lib/adminProducts";
import { ProductForm } from "./ProductForm";

export function AdminProductEditClient({ handle, baseProduct }) {
  const [product, setProduct] = useState(baseProduct);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setProduct(resolveProduct(handle, baseProduct));
    setChecked(true);
  }, [handle, baseProduct]);

  if (!checked) return null;
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
