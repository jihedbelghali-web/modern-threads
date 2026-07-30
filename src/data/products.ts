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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const rawProducts: Omit<Product, "slug">[] = [
  {
    id: 1,
    name: "Linen Relaxed Blazer",
    category: "Outerwear",
    tags: ["Minimal Outerwear", "Essentials"],
    price: 228,
    originalPrice: 285,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
    ],
    description:
      "An unstructured blazer cut from heavyweight linen. Features a relaxed fit with notch lapels and patch pockets.",
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#e8dcc8" },
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Sage", hex: "#a8b5a0" },
    ],
    stock: 18,
    rating: 4.7,
    fabricCare:
      "100% European linen. Machine wash cold on a gentle cycle, tumble dry low, and steam iron on medium heat. Do not bleach. Dry cleaning recommended to preserve the fabric structure.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    category: "Dresses",
    tags: ["Essentials"],
    price: 340,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80",
    ],
    description:
      "Effortlessly elegant midi dress in pure silk charmeuse. Bias-cut for a fluid drape that moves with you.",
    badge: "New",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Ivory", hex: "#f5f0e8" },
      { name: "Dusty Rose", hex: "#c9a9a0" },
    ],
    stock: 7,
    rating: 4.9,
    fabricCare:
      "100% Mulberry silk. Dry clean only. Store flat or on a padded hanger away from direct sunlight to prevent fading.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 3,
    name: "Wool Cashmere Coat",
    category: "Outerwear",
    tags: ["Minimal Outerwear"],
    price: 520,
    originalPrice: 650,
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
      "https://images.unsplash.com/photo-1608236415050-1d1a5eee8de8?w=600&q=80",
    ],
    description:
      "A classic double-breasted coat in a wool-cashmere blend. Tailored silhouette with a self-belt closure.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#c9a96e" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey Melange", hex: "#8a8a8a" },
    ],
    stock: 5,
    rating: 4.8,
    fabricCare:
      "70% wool, 30% cashmere. Dry clean only. Store on a wide padded hanger and use a garment bag for long-term storage.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 4,
    name: "Recycled Nylon Tote",
    category: "Accessories",
    tags: ["Streetwear", "Essentials"],
    price: 185,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    description:
      "Everyday carry tote crafted from recycled nylon twill. Water-resistant with an interior zip pocket.",
    badge: "Eco",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Olive", hex: "#6b7c5e" },
      { name: "Sand", hex: "#d4c5a9" },
    ],
    stock: 24,
    rating: 4.5,
    fabricCare:
      "100% recycled nylon (ECONYL®). Spot clean with mild soap and damp cloth. Machine wash cold on delicate if needed — air dry only.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 5,
    name: "Organic Cotton Denim",
    category: "Bottoms",
    tags: ["Streetwear", "Essentials"],
    price: 148,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
    ],
    description:
      "High-rise straight-leg jeans in organic cotton denim. Rigid with a hint of stretch for all-day comfort.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#26466d" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Stone Wash", hex: "#8a9ba8" },
    ],
    stock: 32,
    rating: 4.6,
    fabricCare:
      "100% organic cotton denim. Machine wash cold inside out, hang dry. Wash sparingly to preserve color and reduce environmental impact.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 6,
    name: "Merino Crew Sweater",
    category: "Knitwear",
    tags: ["Minimal Outerwear", "Essentials"],
    price: 195,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a12?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    description:
      "Fine-gauge merino wool crewneck with ribbed cuffs and hem. Lightweight yet insulating for transitional layering.",
    badge: "Limited",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#f5eedc" },
      { name: "Navy", hex: "#1b2a4a" },
      { name: "Burgundy", hex: "#6e2c3d" },
    ],
    stock: 11,
    rating: 4.7,
    fabricCare:
      "100% extra-fine merino wool. Hand wash cold with wool-specific detergent, lay flat to dry. Do not wring. Store folded to maintain shape.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    tags: ["Streetwear"],
    price: 275,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1564309098800-9e00c5907b23?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
    description:
      "Grain leather crossbody with an adjustable strap and magnetic snap closure. Fits essentials with room to spare.",
    sizes: ["One Size"],
    colors: [
      { name: "Tobacco", hex: "#b87a3e" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 9,
    rating: 4.4,
    fabricCare:
      "Full-grain calf leather. Wipe clean with a damp cloth. Condition every 3–6 months with a leather balm. Avoid prolonged exposure to rain.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 8,
    name: "Linen Wide-Leg Trousers",
    category: "Bottoms",
    tags: ["Minimal Outerwear", "Essentials"],
    price: 168,
    originalPrice: 210,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
    ],
    description:
      "Effortless wide-leg trousers in washed linen. Elasticated waist with a drawstring for the perfect fit.",
    badge: "Sale",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#e3d9c5" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Olive", hex: "#6b7c5e" },
    ],
    stock: 15,
    rating: 4.3,
    fabricCare:
      "100% European linen. Machine wash cold on gentle cycle, tumble dry low. Iron on medium heat while slightly damp for best results.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 9,
    name: "Oversized Hoodie",
    category: "Knitwear",
    tags: ["Streetwear"],
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    description:
      "A heavyweight oversized hoodie in brushed organic cotton fleece. Dropped shoulders, ribbed cuffs, and a kangaroo pocket.",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Grey", hex: "#b8b8b8" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Forest", hex: "#2d4a3e" },
    ],
    stock: 28,
    rating: 4.8,
    fabricCare:
      "100% organic cotton fleece. Machine wash cold inside out, tumble dry low. Avoid fabric softener to maintain the fleece texture.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 10,
    name: "Tailored Trench Coat",
    category: "Outerwear",
    tags: ["Minimal Outerwear"],
    price: 480,
    originalPrice: 580,
    images: [
      "https://images.unsplash.com/photo-1608236415050-1d1a5eee8de8?w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
    ],
    description:
      "A modern take on the iconic trench. Water-repellent cotton gabardine with a removable belt and storm flaps.",
    badge: "Sale",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Stone", hex: "#c4b99a" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 3,
    rating: 4.9,
    fabricCare:
      "100% cotton gabardine with DWR finish. Dry clean only. Re-apply water-repellent treatment after 5–6 washes to maintain performance.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 11,
    name: "Organic Cotton Tee Pack",
    category: "Tops",
    tags: ["Essentials", "Streetwear"],
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    description:
      "Three-pack of heavyweight organic cotton crew tees. Pre-shrunk, garment-dyed, and built to last through endless rotations.",
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White / Black / Grey", hex: "#f0f0f0" },
      { name: "Oatmeal / Sage / Clay", hex: "#e8dcc8" },
    ],
    stock: 42,
    rating: 4.6,
    fabricCare:
      "100% organic cotton, 220 gsm. Machine wash cold, tumble dry medium. Garment-dyed — wash separately for the first cycle.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
  {
    id: 12,
    name: "Wool Beanie",
    category: "Accessories",
    tags: ["Streetwear", "Essentials"],
    price: 48,
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",
      "https://images.unsplash.com/photo-1597931752512-0e84c7e9cc33?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
    description:
      "A ribbed-knit beanie in heavyweight wool. Double-layered cuff for extra warmth and a clean finish.",
    sizes: ["One Size"],
    colors: [
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Cream", hex: "#f5eedc" },
      { name: "Burgundy", hex: "#6e2c3d" },
    ],
    stock: 36,
    rating: 4.5,
    fabricCare:
      "100% wool. Hand wash cold, lay flat to dry. Do not wring — reshape while damp.",
    shippingPolicy:
      "Free standard shipping on all orders over $200. Express delivery available for $15. Returns accepted within 30 days of delivery in unworn condition with tags attached.",
  },
];

export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  slug: slugify(p.name),
}));
