"use client";

import { useState, useMemo, use } from "react";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/store/CartProvider";

/* ─── Badge colors ─── */

const BADGE_STYLES: Record<string, string> = {
  Promo: "bg-rose-600 text-white",
  Nouveau: "bg-emerald-600 text-white",
};

/* ─── Accordion ─── */

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {title}
        <svg
          className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{children}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-32 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Produit introuvable
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Le produit que vous recherchez n&apos;existe pas ou a été retiré.
        </p>
        <Link
          href="/shop"
          className="mt-4 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Voir la boutique
        </Link>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

/* ─── Detail Content (has hooks) ─── */

function ProductDetailContent({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  /* ── Related products ── */
  const related = useMemo(() => {
    return products
      .filter((p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t)))
      .slice(0, 4);
  }, [product]);

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* ─── Breadcrumb ─── */}
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 pt-6 text-xs text-zinc-400 md:px-12">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          Boutique
        </Link>
        <span>/</span>
        <span className="text-zinc-600 dark:text-zinc-400">{product.name}</span>
      </div>

      {/* ─── Main ─── */}
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Image Gallery ── */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    BADGE_STYLES[product.badge] ?? "bg-zinc-950 text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/5] w-20 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    selectedImage === idx
                      ? "border-zinc-950 dark:border-zinc-100"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} vue ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                {product.category}
              </span>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating) ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {product.rating} / 5
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {product.price} TND
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-400 line-through">
                  {product.originalPrice} TND
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {product.description}
            </p>

            {/* Stock badge */}
            <div className="flex items-center gap-2">
              {inStock ? (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    lowStock
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${lowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
                  {lowStock ? `Plus que ${product.stock} en stock` : "En stock"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Rupture de stock
                </span>
              )}
            </div>

            {/* Size picker */}
            {product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
              <fieldset>
                <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                  Taille — <span className="font-normal normal-case">{selectedSize}</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!inStock}
                      className={`h-10 min-w-[3rem] rounded-xl px-4 text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-zinc-950 text-white ring-2 ring-zinc-950 dark:bg-white dark:text-zinc-950 dark:ring-zinc-100"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Color swatches */}
            {product.colors.length > 0 && (
              <fieldset>
                <legend className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                  Couleur — <span className="font-normal normal-case">{selectedColor}</span>
                </legend>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      disabled={!inStock}
                      className={`h-8 w-8 rounded-full transition-all duration-200 ${
                        selectedColor === color.name
                          ? "scale-110 ring-2 ring-zinc-950 ring-offset-2 dark:ring-zinc-100"
                          : "ring-1 ring-zinc-300 hover:scale-105 dark:ring-zinc-600"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!inStock}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-30 dark:hover:text-zinc-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="flex h-10 w-10 items-center justify-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={!inStock || quantity >= product.stock}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-30 dark:hover:text-zinc-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : inStock
                      ? "bg-zinc-950 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600"
                }`}
              >
                {added ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Ajouté au panier
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Ajouter au panier — {product.price} TND
                  </span>
                )}
              </button>
            </div>

            {/* Accordion sections */}
            <div className="mt-2 border-t border-zinc-200 dark:border-zinc-800">
              <Accordion title="Composition & Entretien">{product.fabricCare}</Accordion>
              <Accordion title="Livraison & Retours">{product.shippingPolicy}</Accordion>
            </div>
          </div>
        </div>

        {/* ─── Vous Pourriez Aussi Aimer ─── */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Vous pourriez aussi aimer
            </h2>
            <div className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group w-64 shrink-0 snap-start"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-medium tracking-wider text-zinc-400 uppercase">
                        {p.category}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {p.name}
                      </h3>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {p.price} TND
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
