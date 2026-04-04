"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Mic, SlidersHorizontal, LayoutList } from "lucide-react";
import { Product, initialProducts } from "@/data/products";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/context/ToastsContext";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

const ProductTable = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useLocalStorage<Product[]>("product-data-store-v2", initialProducts);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceFilter, categoryFilter]);

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, "ellipsis", total];
    if (current >= total - 2) return [1, "ellipsis", total - 3, total - 2, total - 1, total];
    return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const confirmDelete = () => {
    if (productToDelete === null) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
    showToast("Product deleted successfully!");
    setProductToDelete(null);
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

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-[180px]">
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

            <div className="relative w-full sm:w-[180px]">
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
              {currentProducts.map((product, index) => (
                <tr
                  key={product.id}
                  onClick={() => setProductDetails(product)}
                  className={`group transition-colors hover:bg-muted/50 cursor-pointer ${
                    index !== currentProducts.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4 align-middle">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted/60 min-w-14">
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


                  <td className="px-4 py-4 align-middle">
                    <span className="text-sm font-medium text-foreground">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${product.salePrice.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
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
                        onClick={() => setProductToDelete(product.id)}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-950 dark:hover:text-rose-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentProducts.length === 0 && (
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
        {totalPages > 1 && (
          <div className="border-t border-border px-6 py-4">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                    />
                  </PaginationItem>
                )}
                {visiblePages.map((page, i) => (
                  <PaginationItem key={i}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page as number);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <Dialog open={productToDelete !== null} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#242933] border-slate-200 dark:border-[#313745] p-0 overflow-hidden gap-0 text-slate-900 dark:text-slate-200">
          <DialogHeader className="p-5 pb-4">
            <DialogTitle className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">Delete Product</DialogTitle>
          </DialogHeader>
          <div className="border-y border-slate-200 dark:border-[#313745] p-5 bg-slate-50 dark:bg-[#242933]">
            <p className="text-[15px] font-medium text-slate-600 dark:text-slate-300">
              Are you sure you want to delete this product?
            </p>
          </div>
          <DialogFooter className="p-4 pb-8 px-8 bg-slate-50 dark:bg-[#242933] flex sm:justify-end gap-2">
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 dark:bg-[#eb5055] dark:hover:bg-[#d4484d] text-white px-5 font-semibold"
              onClick={confirmDelete}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-white hover:bg-slate-100 dark:bg-[#3b4352] dark:hover:bg-[#313745] border-slate-300 dark:border-transparent text-slate-700 dark:text-white dark:hover:text-white px-5 font-semibold"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={productDetails !== null} onOpenChange={(open) => !open && setProductDetails(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {productDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
              <div className="flex items-center justify-center bg-muted/60 rounded-xl p-4 sm:col-span-1 border border-border">
                <img
                  src={productDetails.image}
                  alt={productDetails.name}
                  className="object-contain w-32 h-32"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                        </svg>`;
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{productDetails.name}</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{productDetails.category}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${productDetails.salePrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${productDetails.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {productDetails.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductTable;