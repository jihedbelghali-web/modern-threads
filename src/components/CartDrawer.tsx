"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/CartProvider";

/* ─── Slide-in Cart Drawer ─── */

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-zinc-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <span className="text-4xl">🛒</span>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
                >
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-400">
                        {item.color} · {item.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="flex h-7 w-7 items-center justify-center text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                          </svg>
                        </button>
                      </div>

                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="self-start rounded p-1 text-zinc-400 transition-colors hover:text-rose-500"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-500 dark:text-zinc-400">Subtotal</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                ${totalPrice}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-400">Taxes and shipping calculated at checkout</p>

            <Link
              href="/checkout"
              onClick={onClose}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Proceed to Checkout
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 4.5 6.75 6.75L9 18" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
