export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice: number;
  image: string;
  description: string;
}

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    salePrice: 19.99,
    image: "/products/headphones.png",
    description:
      "High-quality wireless headphones with active noise cancellation, a 30-hour battery life, and crystal-clear audio suitable for audiophiles and regular commuters alike.",
  },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Appliances",
    price: 49.99,
    salePrice: 29.99,
    image: "/products/coffee-maker.png",
    description:
      "A sleek, modern coffee maker capable of brewing a bold, hot pot of coffee in under 5 minutes. Includes a programmable timer so your coffee is ready right when you wake up.",
  },
  {
    id: 3,
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    salePrice: 49.99,
    image: "/products/smartphone.png",
    description:
      "The latest flagship smartphone featuring a stunning OLED display, an advanced triple-camera system, and all-day battery life powered by a next-gen processor.",
  },
];

