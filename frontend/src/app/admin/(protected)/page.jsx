import Link from "next/link";
import { getAllProducts } from "@/data/products";
import { mockOrders } from "@/data/orders-mock";

export default function AdminDashboardPage() {
  const products = getAllProducts();
  const soldOut = products.filter((p) => !p.available).length;

  const stats = [
    { label: "Total Products", value: products.length, href: "/admin/products" },
    { label: "Sold Out", value: soldOut, href: "/admin/products" },
    { label: "Orders", value: mockOrders.length, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-border bg-white p-6 shadow-[0_0_0_1px_var(--color-border)] hover:border-accent"
          >
            <p className="text-sm text-neutral-600">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
