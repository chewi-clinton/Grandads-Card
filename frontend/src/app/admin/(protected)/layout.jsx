"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/adminAuth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 flex-col border-r border-border bg-foreground text-white">
        <div className="flex items-center gap-2 border-b border-white/10 p-4">
          <Image src="/images/site/logo.png" alt="Grandad's Cards" width={32} height={32} />
          <span className="font-heading text-sm font-bold">Admin</span>
        </div>
        <nav className="flex-1 p-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 block rounded px-3 py-2 text-sm font-semibold ${
                  active ? "bg-accent text-white" : "text-white/80 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
          className="border-t border-white/10 p-4 text-left text-sm font-semibold text-white/80 hover:bg-white/10"
        >
          Log Out
        </button>
      </aside>
      <main className="flex-1 bg-background p-8">{children}</main>
    </div>
  );
}
