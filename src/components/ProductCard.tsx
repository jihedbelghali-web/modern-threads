"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/CartProvider";

/* ─── Badge colors ─── */

const BADGE_STYLES: Record<string, string> = {
  Promo: "bg-rose-600 text-white",
  Nouveau: "bg-emerald-600 text-white",
};

function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const defaultColor = product.colors[0]?.name ?? "";
    const defaultSize = product.sizes[0] ?? "";

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultSize,
      color: defaultColor,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide
        transition-all duration-300
        ${
          added
            ? "bg-emerald-600 text-white"
            : "bg-zinc-950 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        }
      `}
    >
      <span
        className={`inline-flex items-center justify-center gap-1.5 transition-all duration-300 ${
          added ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Ajouter au panier
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-300 ${
          added ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        Ajouté
      </span>
    </button>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] ?? "bg-zinc-950 text-white" : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-300 hover:shadow-lg hover:ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-zinc-700"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && badgeStyle && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${badgeStyle}`}
          >
            {product.badge}
          </span>
        )}
        {/* Quick overlay on hover */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 px-1 pt-4 pb-2">
        <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</h3>
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            {product.price} TND
          </span>
          {product.originalPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {product.originalPrice} TND
            </span>
          )}
        </div>
      </div>

      {/* Mobile Add to Cart */}
      <div className="px-1 pb-1 sm:hidden">
        <AddToCartButton product={product} />
      </div>
    </Link>
  );
}
