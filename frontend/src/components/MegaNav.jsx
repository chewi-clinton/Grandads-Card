"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/data/nav";
import { ChevronDownIcon } from "./icons";

export function MegaNav({ mobileOpen }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <nav aria-label="Primary" className={`border-t border-b border-border ${mobileOpen ? "block" : "hidden"} md:block`}>
      {/* Mobile: 2-column grid with row dividers and inline accordion */}
      <ul className="grid grid-cols-2 text-base font-bold font-heading md:hidden">
        {primaryNav.map((item, i) => (
          <li key={item.text} className="border-b border-border last:border-b-0">
            <div className="flex items-center justify-center gap-1 px-2 py-4">
              {item.href ? (
                <Link href={item.href} className="hover:text-accent">
                  {item.text}
                </Link>
              ) : (
                <span className="cursor-default">{item.text}</span>
              )}
              {item.columns && (
                <button
                  type="button"
                  aria-label={`Toggle ${item.text} submenu`}
                  onClick={() => setMobileExpanded((cur) => (cur === i ? null : i))}
                  className="p-1"
                >
                  <ChevronDownIcon
                    width={14}
                    height={14}
                    className={mobileExpanded === i ? "rotate-180" : ""}
                  />
                </button>
              )}
            </div>
            {item.columns && mobileExpanded === i && (
              <div className="col-span-2 bg-background px-4 pb-4">
                {item.columns.map((col) => (
                  <div key={col.heading ?? col.links[0]?.text} className="mb-3">
                    {col.heading && (
                      <div className="mb-1 text-xs uppercase tracking-wide text-neutral-500">{col.heading}</div>
                    )}
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block text-sm font-normal font-sans text-foreground">
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop: single row with hover mega-dropdowns */}
      <ul className="hidden items-center justify-center gap-6 py-3 text-[16px] font-bold font-heading md:flex md:flex-wrap">
        {primaryNav.map((item, i) => (
          <li
            key={item.text}
            className="relative"
            onMouseEnter={() => item.columns && setOpenIndex(i)}
            onMouseLeave={() => item.columns && setOpenIndex(null)}
          >
            {item.href ? (
              <Link href={item.href} className="inline-flex items-center gap-1 px-2 py-1 hover:text-accent">
                {item.text}
                {item.columns && <ChevronDownIcon width={14} height={14} />}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 cursor-default">
                {item.text}
                {item.columns && <ChevronDownIcon width={14} height={14} />}
              </span>
            )}
            {item.columns && openIndex === i && (
              <div className="absolute left-1/2 top-full z-20 flex -translate-x-1/2 gap-8 rounded-b-lg border border-border bg-white p-6 shadow-lg">
                {item.columns.map((col) => (
                  <div key={col.heading ?? col.links[0]?.text} className="min-w-45">
                    {col.heading && (
                      <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500">{col.heading}</div>
                    )}
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block whitespace-nowrap font-normal font-sans text-[15px] text-foreground hover:text-accent"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
