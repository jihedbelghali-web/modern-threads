"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

/* ------------------------------------------------------------------ */
/*  Data helpers                                                      */
/* ------------------------------------------------------------------ */

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const brandValues = [
  {
    title: "Mindful Materials",
    description:
      "Every piece begins with intention — organic cottons, recycled nylons, and traceable wools that tread lightly on the planet.",
    icon: "🌿",
  },
  {
    title: "Timeless Design",
    description:
      "We reject fast trends in favor of considered silhouettes that remain essential season after season.",
    icon: "◇",
  },
  {
    title: "Artisan Craft",
    description:
      "Our collections are brought to life by skilled hands, ensuring each garment meets exacting standards of quality.",
    icon: "⚘",
  },
  {
    title: "Circular Future",
    description:
      "From repair programs to resale partnerships, we're building a system where nothing goes to waste.",
    icon: "♺",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* ──────────────── Hero ──────────────── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-zinc-950">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, #fff 0.5px, transparent 0.5px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 py-24 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          {/* Text */}
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-neutral-600" aria-hidden="true" />
              <span className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase">
                Collection 2026
              </span>
            </div>
            <h1 className="mt-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl">
              Tailored Elegance.
              <br />
              <span className="italic">Uncompromising Style.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-400 lg:text-lg">
              Architectural silhouettes engineered with luxury textiles. Discover refined modern
              staples crafted for distinction.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/shop"
                className="inline-flex items-center gap-3 border border-zinc-600 bg-zinc-800 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-700"
              >
                Explore Collection
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#values"
                className="inline-flex items-center gap-2 border border-zinc-700/60 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:border-zinc-400 hover:text-white"
              >
                Our Ethos
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mt-10 w-full max-w-sm lg:mt-0 lg:max-w-md">
            <div className="aspect-[3/4] overflow-hidden rounded-none border border-zinc-800 bg-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                alt="MAISON BELGHALI editorial campaign"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-4 -left-4 rounded-none border border-zinc-800 bg-zinc-950/80 px-5 py-3 backdrop-blur-md">
              <p className="text-sm font-medium text-white">New Arrivals</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce lg:block">
          <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0-4.5-4.5m4.5 4.5 4.5-4.5" />
          </svg>
        </div>
      </section>

      {/* ──────────────── Products ──────────────── */}
      <section id="products" className="bg-zinc-50 px-6 py-24 md:px-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                The Collection
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                New&nbsp;Essentials
              </h2>
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                    ${
                      activeCategory === cat
                        ? "bg-zinc-900 text-white shadow-md dark:bg-white dark:text-zinc-900"
                        : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
                No products in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────── Brand Values ──────────────── */}
      <section id="values" className="bg-white px-6 py-24 md:px-12 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Why MAISON BELGHALI
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Built on purpose.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              Every decision we make is guided by a commitment to people, planet, and enduring
              quality.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {brandValues.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
                <span className="text-3xl">{value.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {value.description}
                </p>
                <div className="mt-4 h-0.5 w-8 rounded-full bg-zinc-200 transition-all duration-300 group-hover:w-12 group-hover:bg-zinc-900 dark:bg-zinc-800 dark:group-hover:bg-zinc-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Footer CTA ──────────────── */}
      <section className="bg-zinc-950 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the MAISON BELGHALI community
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Be the first to know about new drops, limited editions, and conscious fashion stories.
            No spam — just the good stuff.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="min-w-0 flex-1 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} MAISON BELGHALI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Shipping
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Returns
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
