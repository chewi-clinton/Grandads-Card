import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4 text-sm text-neutral-600">
      {items.map((item, i) => (
        <span key={item.text}>
          {item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.text}
            </Link>
          ) : (
            <span>{item.text}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">&gt;</span>}
        </span>
      ))}
    </nav>
  );
}
