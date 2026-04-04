export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice: number;
  image: string;
  description: string;
}

const baseTemplates = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    salePrice: 19.99,
    image: "/products/headphones.png",
    description:
      "High-quality wireless headphones with active noise cancellation, a 30-hour battery life, and crystal-clear audio suitable for audiophiles and regular commuters alike.",
  },
  {
    name: "Coffee Maker",
    category: "Appliances",
    price: 49.99,
    salePrice: 29.99,
    image: "/products/coffee-maker.png",
    description:
      "A sleek, modern coffee maker capable of brewing a bold, hot pot of coffee in under 5 minutes. Includes a programmable timer so your coffee is ready right when you wake up.",
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    salePrice: 49.99,
    image: "/products/smartphone.png",
    description:
      "The latest flagship smartphone featuring a stunning OLED display, an advanced triple-camera system, and all-day battery life powered by a next-gen processor.",
  },
];

export const initialProducts: Product[] = Array.from({ length: 1000 }).map(
  (_, index) => {
    const template = baseTemplates[index % baseTemplates.length];
    return {
      ...template,
      id: index + 1,
      name: `${template.name} ${index + 1}`,
    };
  }
);
