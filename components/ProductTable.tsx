"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Mic, SlidersHorizontal, LayoutList } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice: number;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    salePrice: 19.99,
    image: "/products/headphones.png",
  },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Appliances",
    price: 49.99,
    salePrice: 29.99,
    image: "/products/coffee-maker.png",
  },
  {
    id: 3,
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    salePrice: 49.99,
    image: "/products/smartphone.png",
  },
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const range = priceRanges[priceFilter];
      const matchesPrice =
        product.price >= range.min && product.price < range.max;
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [products, searchQuery, priceFilter, categoryFilter]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            Product List
          </h2>
        </div>

        <div className="px-6 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
            <Input
              id="product-search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-muted/50 pl-10 pr-10 py-5"
            />
            <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors z-10" />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[180px]">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground z-10 pointer-events-none" />
              <Select value={String(priceFilter)} onValueChange={(val) => setPriceFilter(Number(val))}>
                <SelectTrigger className="w-full rounded-lg bg-muted/50 pl-9 font-medium">
                  <SelectValue placeholder="Filter by Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range, i) => (
                    <SelectItem key={i} value={String(i)}>
                      {i === 0 ? "Filter by Price" : range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-[180px]">
              <LayoutList className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground z-10 pointer-events-none" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full rounded-lg bg-muted/50 pl-9 font-medium">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "All" ? "Category" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="w-10 px-4 py-3" />
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`group transition-colors hover:bg-muted/50 ${
                    index !== filteredProducts.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    <Checkbox
                      id={`select-product-${product.id}`}
                      checked={selectedIds.has(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                      className="h-4 w-4"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted/60">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                              </svg>`;
                          }
                        }}
                      />
                    </div>
                  </td>


                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${product.salePrice.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        id={`edit-product-${product.id}`}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                      >
                        Edit
                      </Button>
                      <Button
                        id={`delete-product-${product.id}`}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-950 dark:hover:text-rose-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;