"use client";

import { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ── Filter constants ── */

const CATEGORIES = Array.from(new Set(products.map((p) => p.category)));
const SIZES = ["S", "M", "L", "XL"] as const;
const SORT_OPTIONS = [
  { label: "Nouveautés", value: "newest" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Meilleures notes", value: "rating" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/* ── Price range helpers ── */

const PRICE_MIN = 0;
const PRICE_MAX = 450;

/* ── Page (wrapped in Suspense for useSearchParams) ── */

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center px-6 text-sm text-zinc-500">
          Chargement de la boutique…
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}

/* ── Component ── */

function ShopPageContent() {
  const searchParams = useSearchParams();

  /* filters */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortValue>("newest");

  // Track the URL-derived filter values last applied, so local checkbox toggles
  // are never overwritten and we only setState when the URL actually changes.
  const lastSyncedCategories = useRef("");
  const lastSyncedPromo = useRef(false);

  // Sync category/promo filters from URL params (?categorie=X&promo=1)
  useEffect(() => {
    const categorie = searchParams.get("categorie");
    const nextCategories = categorie ? [categorie] : [];
    if (nextCategories.join(",") !== lastSyncedCategories.current) {
      lastSyncedCategories.current = nextCategories.join(",");
      setSelectedCategories(nextCategories);
    }

    const nextPromo = searchParams.get("promo") === "1";
    if (nextPromo !== lastSyncedPromo.current) {
      lastSyncedPromo.current = nextPromo;
      setPromoOnly(nextPromo);
    }
  }, [searchParams]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  /* ── Filtered + sorted products ── */

  const filtered = useMemo(() => {
    let result = [...products];

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Promotions only
    if (promoOnly) {
      result = result.filter((p) => p.originalPrice != null || p.badge === "Promo");
    }

    // Price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => s !== "One Size" && selectedSizes.includes(s))
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategories, promoOnly, priceRange, selectedSizes, sort]);

  const activeFiltersCount =
    selectedCategories.length +
    (promoOnly ? 1 : 0) +
    selectedSizes.length +
    (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPromoOnly(false);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSelectedSizes([]);
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      {/* Page header */}
      <div className="border-b border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Boutique
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-4xl dark:text-zinc-50">
            Tous les produits
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:px-12">
        {/* ─── Sidebar ─── */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="sticky top-6 space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header + clear */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Filtres</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
                >
                  Tout effacer
                </button>
              )}
            </div>

            {/* Categories */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Catégories
              </legend>
              <div className="space-y-2.5">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex cursor-pointer items-center gap-3 text-sm">
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded border transition-colors ${
                        selectedCategories.includes(cat)
                          ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                          : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
                      }`}
                    >
                      {selectedCategories.includes(cat) && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="sr-only"
                    />
                    <span className="text-zinc-700 dark:text-zinc-300">{cat}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Promotions */}
            <fieldset>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <span
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded border transition-colors ${
                    promoOnly
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                      : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
                  }`}
                >
                  {promoOnly && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={promoOnly}
                  onChange={(e) => setPromoOnly(e.target.checked)}
                  className="sr-only"
                />
                <span className="font-medium text-rose-600 uppercase">En promotion</span>
              </label>
            </fieldset>

            {/* Price range */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Prix (TND)
              </legend>
              <div className="space-y-3">
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Math.max(priceRange[0], Number(e.target.value))])
                  }
                  className="w-full accent-zinc-950 dark:accent-zinc-100"
                />
                <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>{priceRange[0]} TND</span>
                  <span>{priceRange[1]} TND</span>
                </div>
              </div>
            </fieldset>

            {/* Sizes */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Tailles
              </legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedSizes.includes(size)
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Sort */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Trier par
              </legend>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:border-zinc-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        </aside>

        {/* ─── Product Grid ─── */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Aucun produit trouvé
              </h3>
              <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                Essayez d&apos;ajuster vos filtres ou de les effacer pour voir toute la collection.
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
