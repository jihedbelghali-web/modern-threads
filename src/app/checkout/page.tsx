"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/CartProvider";

/* ─── Form State ─── */

interface CheckoutForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

/* ─── Order Confirmation ─── */

function OrderConfirmation() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
        <svg
          className="h-10 w-10 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Order Confirmed!
      </h1>
      <p className="max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
        Thank you for your order. We&apos;ve received it via WhatsApp and will process it shortly.
        You&apos;ll receive a confirmation message soon.
      </p>
      <Link
        href="/shop"
        className="mt-4 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

/* ─── Main Checkout Page ─── */

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Redirect to home if cart is empty (and not just submitted)
  useEffect(() => {
    if (items.length === 0 && !submitted) {
      router.push("/");
    }
  }, [items.length, router, submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Delivery address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          notes: form.notes,
        },
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        totalPrice,
        totalItems,
      };

      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to send order notification");
      }

      // Clear cart and show confirmation on success
      clearCart();
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Show confirmation after order
  if (submitted) {
    return <OrderConfirmation />;
  }

  // Empty cart guard
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-zinc-600 dark:hover:text-zinc-300">
              Shop
            </Link>
            <span>/</span>
            <span className="text-zinc-600 dark:text-zinc-400">Checkout</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Complete your order details below. We&apos;ll send your order directly via WhatsApp.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* ─── Form Section ─── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Delivery Information
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Fill in your details for order delivery.
              </p>

              <div className="mt-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`mt-1.5 w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 ${
                      errors.fullName ? "border-rose-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`mt-1.5 w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 ${
                      errors.phone ? "border-rose-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
                  )}
                </div>

                {/* Delivery Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apt 4B"
                    className={`mt-1.5 w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 ${
                      errors.address ? "border-rose-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-rose-500">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={`mt-1.5 w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 ${
                      errors.city ? "border-rose-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-rose-500">{errors.city}</p>
                  )}
                </div>

                {/* Order Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Order Notes <span className="text-zinc-400">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions for your order..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp Note */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-900/10">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Order via WhatsApp
                </p>
                <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">
                  Your order will be sent directly to our WhatsApp. We&apos;ll confirm availability and provide payment details.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Order Summary ─── */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                {totalItems} item{totalItems !== 1 && "s"} in your cart
              </p>

              {/* Items List */}
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {item.color} · {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="mt-6 space-y-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/30 dark:bg-rose-900/10">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    {submitError}
                  </p>
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
                  submitting
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
                }`}
              >
                {submitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending Order...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Place Order
                  </>
                )}
              </button>

              {/* Back link */}
              <Link
                href="/shop"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:border-zinc-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 19.5 3-3m0 0 3-3m-3 3-3 3m3-3h11.25M3.75 4.5l.375 4.5H19.5" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
