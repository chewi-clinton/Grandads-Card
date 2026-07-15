import { getAllProducts } from "@/data/products";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

export default function AdminProductsPage() {
  const products = getAllProducts();
  return <AdminProductsTable initialProducts={products} />;
}
