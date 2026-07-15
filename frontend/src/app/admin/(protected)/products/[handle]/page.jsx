import { getProductByHandle } from "@/data/products";
import { AdminProductEditClient } from "@/components/admin/AdminProductEditClient";

export default async function EditProductPage({ params }) {
  const { handle } = await params;
  const baseProduct = getProductByHandle(handle) || null;

  return <AdminProductEditClient handle={handle} baseProduct={baseProduct} />;
}
