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
      <section className="relative overflow-hidden bg-white dark:bg-zinc-950">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, #18181b 0.5px, transparent 0.5px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:px-12 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-zinc-950" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
                Nouvelle Collection — 2026
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-5xl lg:text-6xl dark:text-zinc-50">
              Nouvelle Collection
              <br />
              Homme <span className="text-rose-600">2026</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 lg:text-lg dark:text-zinc-400">
              Style moderne &amp; Élégance au quotidien. Des coupes précises, des matières
              nobles et des pièces pensées pour l&apos;homme tunisien exigeant.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-zinc-950 px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-950/20"
              >
                Découvrir la collection
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/shop?promo=1"
                className="inline-flex items-center gap-2 border border-zinc-300 px-8 py-4 text-xs font-bold tracking-[0.2em] text-zinc-700 uppercase transition-all duration-300 hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-zinc-50"
              >
                Voir les promotions
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 lg:ml-auto lg:max-w-md">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                alt="Campagne MAISON BELGHALI — collection homme 2026"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent" />
            </div>
            {/* Floating stat cards */}
            <div className="absolute -left-4 bottom-8 hidden border border-zinc-100 bg-white px-5 py-4 shadow-xl sm:block dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                Paiement à la livraison
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-50">Disponible en Tunisie</p>
            </div>
            <div className="absolute -right-3 top-8 hidden bg-zinc-950 px-5 py-4 sm:block">
              <p className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
                Livraison express
              </p>
              <p className="mt-1 text-sm font-bold text-white">24–48h</p>
            </div>
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
