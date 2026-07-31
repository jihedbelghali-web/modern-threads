export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  badge?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  rating: number;
  fabricCare: string;
  shippingPolicy: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const rawProducts: Omit<Product, "slug">[] = [
  {
    id: 1,
    name: "Chemise en Lin Premium",
    category: "Chemises",
    tags: ["Essentiel", "Moderne"],
    price: 89,
    originalPrice: 120,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    ],
    description:
      "Chemise en lin 100% premium à coupe moderne. Respirante et fluide, idéale pour un look élégant et décontracté, du bureau aux soirées d'été.",
    badge: "Promo",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc", hex: "#f5f5f5" },
      { name: "Bleu Ciel", hex: "#a8c4d8" },
      { name: "Écru", hex: "#e8dcc8" },
    ],
    stock: 18,
    rating: 4.7,
    fabricCare:
      "100% lin européen. Lavage machine à froid, cycle doux, séchage à l'air libre. Repassage vapeur à température moyenne. Ne pas javelliser.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 2,
    name: "Chemise Oxford Slim",
    category: "Chemises",
    tags: ["Essentiel", "Classique"],
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    ],
    description:
      "L'indispensable chemise Oxford en coton peigné, coupe slim ajustée. Un classique intemporel qui se porte en toute occasion.",
    badge: "Nouveau",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc", hex: "#f5f5f5" },
      { name: "Bleu Marine", hex: "#1b2a4a" },
      { name: "Rose Pâle", hex: "#e8c8c0" },
    ],
    stock: 25,
    rating: 4.8,
    fabricCare:
      "100% coton peigné. Lavage machine à 30°C, séchage à l'air libre. Repassage à température moyenne pour un rendu impeccable.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 3,
    name: "Chemise Coton Élégante",
    category: "Chemises",
    tags: ["Essentiel", "Moderne"],
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    ],
    description:
      "Chemise en coton gaufré à la fois légère et structurée. Parfaite pour un style raffiné au quotidien, seule ou sous un costume.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc", hex: "#f5f5f5" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Gris Clair", hex: "#d6d6d6" },
    ],
    stock: 30,
    rating: 4.5,
    fabricCare:
      "100% coton. Lavage machine à 30°C, cycle délicat. Repassage à température moyenne, de préférence sur coton légèrement humide.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 4,
    name: "Pantalon Chino Cintré",
    category: "Pantalons",
    tags: ["Essentiel", "Classique"],
    price: 98,
    images: [
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    ],
    description:
      "Chino en coton stretch à coupe cintrée. Un pantalon polyvalent, chic et confortable, l'allié parfait de votre garde-robe.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Kaki", hex: "#8a7a5c" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Nuit", hex: "#232a3a" },
    ],
    stock: 22,
    rating: 4.6,
    fabricCare:
      "98% coton, 2% élasthanne. Lavage machine à 30°C, retourné. Repassage à température moyenne. Ne pas utiliser de sèche-linge.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 5,
    name: "Jean Slim Homme",
    category: "Pantalons",
    tags: ["Essentiel", "Moderne"],
    price: 110,
    originalPrice: 135,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
    ],
    description:
      "Jean slim en denim brut avec une légère élasticité pour un confort absolu. Une coupe moderne qui affine la silhouette.",
    badge: "Promo",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#26466d" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Moyen", hex: "#5d7ea3" },
    ],
    stock: 35,
    rating: 4.7,
    fabricCare:
      "99% coton, 1% élasthanne. Lavage machine à 30°C à l'envers, séchage à l'air libre. Laver rarement pour préserver la couleur.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 6,
    name: "Pantalon de Costume",
    category: "Pantalons",
    tags: ["Élégance"],
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
    ],
    description:
      "Pantalon de costume à coupe droite et taille ajustée, en tissu premium. Le compagnon idéal de vos costumes et vestes.",
    badge: "Nouveau",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Anthracite", hex: "#3a3a3a" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Marine", hex: "#1b2a4a" },
    ],
    stock: 14,
    rating: 4.6,
    fabricCare:
      "70% polyester, 30% viscose. Nettoyage à sec recommandé. Repassage à vapeur à basse température.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 7,
    name: "Costume 2 Pièces Slim",
    category: "Costumes",
    tags: ["Élégance", "Classique"],
    price: 390,
    originalPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
    ],
    description:
      "Costume deux pièces à coupe slim : veste ajustée et pantalon droit. Confectionné dans un tissu italien haut de gamme pour un tombé impeccable.",
    badge: "Promo",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Marine", hex: "#1b2a4a" },
      { name: "Gris Perle", hex: "#c8c8c8" },
    ],
    stock: 8,
    rating: 4.9,
    fabricCare:
      "Tissu italien : 55% laine, 45% polyester. Nettoyage à sec uniquement. Suspendre sur cintre rembourré pour préserver la coupe.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 8,
    name: "Costume Mariage Premium",
    category: "Costumes",
    tags: ["Élégance", "Moderne"],
    price: 420,
    images: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
    ],
    description:
      "Le costume signature pour les grandes occasions. Coupe précise, épaules nettes et finitions soignées pour un mariage inoubliable.",
    badge: "Nouveau",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Nuit", hex: "#232a3a" },
      { name: "Bordeaux", hex: "#6e2c3d" },
    ],
    stock: 5,
    rating: 4.9,
    fabricCare:
      "60% laine vierge, 40% polyester. Nettoyage à sec uniquement. Repassage vapeur à basse température. Utiliser un cintre rembourré.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 9,
    name: "Blazer Cintré Homme",
    category: "Costumes",
    tags: ["Élégance"],
    price: 240,
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    ],
    description:
      "Blazer cintré en tissu souple, boutonnage deux boutons et poches à rabat. S'adapte aussi bien aux tenues de bureau qu'aux sorties.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bleu Marine", hex: "#1b2a4a" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Beige", hex: "#d4c5a9" },
    ],
    stock: 12,
    rating: 4.7,
    fabricCare:
      "68% polyester, 32% viscose. Nettoyage à sec recommandé. Repassage à vapeur à basse température pour un rendu impeccable.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 10,
    name: "Ceinture Cuir Véritable",
    category: "Accessoires",
    tags: ["Classique", "Essentiel"],
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
    description:
      "Ceinture en cuir véritable à boucle automatique. Un accessoire essentiel qui apporte la touche finale à toute tenue.",
    sizes: ["One Size"],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Marron", hex: "#8a5a2b" },
    ],
    stock: 40,
    rating: 4.5,
    fabricCare:
      "Cuir véritable. Nettoyer avec un chiffon doux et légèrement humide. Nourrir le cuir tous les 3 mois avec un baume adapté.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 11,
    name: "Montre Classique Homme",
    category: "Accessoires",
    tags: ["Classique", "Élégance"],
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    ],
    description:
      "Montre classique au cadran minimaliste avec bracelet en cuir. Un accessoire d'élégance intemporelle qui traverse les saisons.",
    badge: "Nouveau",
    sizes: ["One Size"],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Marron", hex: "#8a5a2b" },
    ],
    stock: 10,
    rating: 4.6,
    fabricCare:
      "Bracelet en cuir véritable, cadran minéral. Éviter le contact prolongé avec l'eau. Nettoyer le bracelet avec un chiffon doux.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
  {
    id: 12,
    name: "Cravate en Soie",
    category: "Accessoires",
    tags: ["Élégance"],
    price: 39,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    description:
      "Cravate en soie douce au motif discret. La touche raffinée qui complète costume, chemise et blazer avec caractère.",
    sizes: ["One Size"],
    colors: [
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Bleu Marine", hex: "#1b2a4a" },
      { name: "Bordeaux", hex: "#6e2c3d" },
    ],
    stock: 28,
    rating: 4.4,
    fabricCare:
      "100% soie. Nettoyage à sec uniquement. Défaire le nœud après chaque port et suspendre pour éviter les plis.",
    shippingPolicy:
      "Livraison express en 24/48h sur toute la Tunisie. Paiement à la livraison disponible. Échange ou retour sous 7 jours.",
  },
];

export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  slug: slugify(p.name),
}));
