import Link from "next/link";

export function Pagination({ basePath, currentPage, totalPages, searchParams }) {
  if (totalPages <= 1) return null;

  function hrefFor(page) {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-neutral-400">
            &hellip;
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded px-2 text-sm ${
              p === currentPage ? "bg-foreground text-white" : "border border-border hover:bg-background"
            }`}
          >
            {p}
          </Link>
        )
      )}
    </nav>
  );
}
