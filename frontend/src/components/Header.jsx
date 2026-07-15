"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaNav } from "./MegaNav";
import { CartButton } from "./CartButton";
import { SearchBar } from "./SearchBar";
import { AccountIcon, HamburgerIcon, SearchIcon } from "./icons";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <AnnouncementBar />
      <div className="container mx-auto flex flex-wrap items-center gap-4 px-4 py-4">
        <Link href="/" className="shrink-0">
          <Image src="/images/site/logo.png" alt="Grandad's Cards" width={60} height={60} priority />
        </Link>

        <div className="hidden sm:order-0 sm:block sm:flex-1 sm:max-w-md">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            onClick={() => setMobileSearchOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 md:hidden"
          >
            <SearchIcon width={18} height={20} />
          </button>
          <a
            href="https://grandadscards.shop/customer_authentication/redirect?locale=en&region_country=US"
            aria-label="Log in"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
          >
            <AccountIcon />
          </a>
          <CartButton />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 md:hidden"
          >
            <HamburgerIcon />
          </button>
        </div>

        {mobileSearchOpen && (
          <div className="order-last w-full sm:hidden">
            <SearchBar />
          </div>
        )}
      </div>
      <MegaNav mobileOpen={mobileOpen} />
    </header>
  );
}
