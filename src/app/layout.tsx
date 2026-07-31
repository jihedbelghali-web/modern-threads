import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/store/CartProvider";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAISON BELGHALI — Prêt-à-Porter Homme en Tunisie",
  description:
    "Découvrez la nouvelle collection homme 2026 de MAISON BELGHALI : chemises, pantalons, costumes et accessoires. Livraison 24/48h et paiement à la livraison sur toute la Tunisie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
