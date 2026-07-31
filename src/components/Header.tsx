"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/CartProvider";
import CartDrawer from "@/components/CartDrawer";

/* ─── Nav links ─── */

const NAV_LINKS = [
  { label: "Nouveautés", href: "/#nouveautes" },
  { label: "Chemises", href: "/shop?categorie=Chemises" },
  { label: "Pantalons", href: "/shop?categorie=Pantalons" },
  { label: "Costumes", href: "/shop?categorie=Costumes" },
  { label: "Promotions", href: "/shop?promo=1" },
];

/* ─── Site Header with Cart Icon ─── */

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCartStore();

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="bg-neutral-950 px-4 py-2 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase sm:text-xs">
          Livraison en 24/48h sur toute la Tunisie
          <span className="mx-2 text-[#D4A359] sm:mx-3">|</span>
          Paiement à la livraison
        </p>
      </div>

      {/* ── Main navbar ── */}
      <header className="sticky top-0 z-30 border-b border-[#D4A359]/60 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <span className="text-lg font-black uppercase tracking-[0.2em] text-[#D4A359] sm:text-xl">
              Belghali
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-[13px] font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-[#D4A359]"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-[#D4A359] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-[#D4A359]"
              aria-label="Open cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A359] text-[10px] font-bold text-neutral-950">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {menuOpen && (
          <nav className="border-t border-[#D4A359]/60 bg-neutral-950 px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-[#D4A359]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
