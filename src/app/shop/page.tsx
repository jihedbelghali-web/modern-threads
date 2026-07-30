"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ── Filter constants ── */

const TAGS = ["Streetwear", "Minimal Outerwear", "Essentials"] as const;
const SIZES = ["S", "M", "L", "XL"] as const;
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/* ── Price range helpers ── */

const PRICE_MIN = 0;
const PRICE_MAX = 600;

/* ── Component ── */

export default function ShopPage() {
  /* filters */
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortValue>("newest");

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  /* ── Filtered + sorted products ── */

  const filtered = useMemo(() => {
    let result = [...products];

    // Tags
    if (selectedTags.length > 0) {
      result = result.filter((p) => p.tags.some((t) => selectedTags.includes(t)));
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
  }, [selectedTags, priceRange, selectedSizes, sort]);

  const activeFiltersCount =
    selectedTags.length + selectedSizes.length + (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX ? 1 : 0);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      {/* Page header */}
      <div className="border-b border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Explore
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            All Products
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {filtered.length} product{filtered.length !== 1 && "s"}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:px-12">
        {/* ─── Sidebar ─── */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="sticky top-6 space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header + clear */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Filters</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setPriceRange([PRICE_MIN, PRICE_MAX]);
                    setSelectedSizes([]);
                  }}
                  className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category tags */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Category
              </legend>
              <div className="space-y-2.5">
                {TAGS.map((tag) => (
                  <label key={tag} className="flex cursor-pointer items-center gap-3 text-sm">
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded border transition-colors ${
                        selectedTags.includes(tag)
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
                      }`}
                    >
                      {selectedTags.includes(tag) && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="sr-only"
                    />
                    <span className="text-zinc-700 dark:text-zinc-300">{tag}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Price range */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Price Range
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
                  className="w-full accent-zinc-900 dark:accent-zinc-100"
                />
                <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </fieldset>

            {/* Sizes */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Size
              </legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedSizes.includes(size)
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
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
                Sort By
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
                No products found
              </h3>
              <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                Try adjusting your filters or clearing them to see the full collection.
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setPriceRange([PRICE_MIN, PRICE_MAX]);
                    setSelectedSizes([]);
                  }}
                  className="mt-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
