"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

/* ------------------------------------------------------------------ */
/*  Data helpers                                                      */
/* ------------------------------------------------------------------ */

const CATEGORY_CARDS = [
  {
    name: "Chemises",
    href: "/shop?categorie=Chemises",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80",
  },
  {
    name: "Pantalons",
    href: "/shop?categorie=Pantalons",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
  },
  {
    name: "Costumes",
    href: "/shop?categorie=Costumes",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80",
  },
  {
    name: "Accessoires",
    href: "/shop?categorie=Accessoires",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=80",
  },
];

const VALUE_PROPS = [
  {
    icon: "🚚",
    title: "Livraison Express",
    text: "24–48h sur toute la Tunisie",
  },
  {
    icon: "💶",
    title: "Paiement à la Livraison",
    text: "Payez en espèces à la réception de votre colis",
  },
  {
    icon: "🔁",
    title: "Échange & Retour",
    text: "Sous 7 jours, satisfait ou échangé",
  },
];

const FEATURED_PRODUCTS = products.slice(0, 8);

const categoryCount = (name: string) =>
  products.filter((p) => p.category === name).length;

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ──────────────── Hero ──────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-neutral-950">
        {/* Full-bleed background */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-neutral-950/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/70" />
          {/* Subtle spotlight behind the 3D headline for legibility */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 z-[5] mx-auto h-[70%] max-w-4xl -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,255,255,0.22), transparent 72%)",
            }}
          />
        </div>

        {/* Carousel navigation arrows */}
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-neutral-800/60 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-neutral-800/90 sm:left-6 sm:p-3"
          aria-label="Précédent"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-neutral-800/60 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-neutral-800/90 sm:right-6 sm:p-3"
          aria-label="Suivant"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-center md:px-12">
          {/* Floating glass badge */}
          <div className="mb-8 flex justify-center">
            <Link
              href="/shop"
              className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A359]" aria-hidden="true" />
              Voir Plus
            </Link>
          </div>

          {/* 3D Main Headline */}
          <h1 className="text-4xl font-black uppercase tracking-tight text-neutral-900 [text-shadow:_0_4px_16px_rgba(0,0,0,0.8),_0_2px_0_#ffffff] md:text-7xl">
            New Collection
            <br />
            Summer
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-sm font-bold uppercase tracking-[0.3em] text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)] md:text-base">
            Oversized T-Shirt Urban Wear
          </p>

          {/* Primary action */}
          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4A359] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4A359]/30"
            >
              Voir Plus
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── Categories ──────────────── */}
      <section className="bg-zinc-50 px-6 py-20 md:px-12 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-rose-600 uppercase">
                Nos univers
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-4xl dark:text-zinc-50">
                Nos Catégories
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold tracking-wider text-zinc-500 uppercase underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Tout voir →
            </Link>
          </div>

          {/* Category grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_CARDS.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative aspect-[3/4] overflow-hidden bg-zinc-200"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent transition-opacity duration-300 group-hover:from-zinc-950/90" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <div>
                    <p className="text-lg font-bold tracking-wider text-white uppercase">
                      {cat.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-zinc-300">
                      {categoryCount(cat.name)} pièces
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Featured Products ──────────────── */}
      <section id="nouveautes" className="scroll-mt-24 bg-white px-6 py-20 md:px-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-rose-600 uppercase">
                Nouveautés &amp; best-sellers
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-4xl dark:text-zinc-50">
                La Sélection
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold tracking-wider text-zinc-500 uppercase underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Voir tout le catalogue →
            </Link>
          </div>

          {/* Product grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Value Propositions ──────────────── */}
      <section className="bg-zinc-950 px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-3">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xl">
                {prop.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                  {prop.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{prop.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── Newsletter CTA ──────────────── */}
      <section className="bg-white px-6 py-20 md:px-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-4xl dark:text-zinc-50">
            Rejoignez la newsletter
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Recevez nos offres exclusives, promotions et nouveautés en avant-première.
            Pas de spam — que du style.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-3"
          >
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              required
              className="min-w-0 flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-300 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              S&apos;abonner
            </button>
          </form>
        </div>
      </section>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} MAISON BELGHALI. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Confidentialité
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              CGV
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Livraison
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Retours
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
