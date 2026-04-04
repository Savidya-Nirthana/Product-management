"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../data/products";
import { useToast } from "@/context/ToastsContext";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [products, setProducts] = useLocalStorage<Product[]>("product-data-store-v2", []);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    salePrice: "",
    description: "",
    image: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) return;

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : parseFloat(formData.price),
      description: formData.description,
      image: formData.image || "https://placehold.co/400x400?text=Product",
    };

    setProducts((prev: Product[]) => [newProduct, ...prev]);
    showToast("Product successfully added!", "success");
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden">
      <div className="border-b border-[#e2e8f0] dark:border-[#1e293b] px-6 py-4">
        <h2 className="text-[22px] font-bold text-[#334155] dark:text-[#f8fafc]">
          Add Product
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
            Product Name
          </label>
          <Input 
            className="w-full bg-transparent" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
              Price ($)
            </label>
            <Input 
              type="number" 
              className="w-full bg-transparent" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
              Sale Price / Discount ($)
            </label>
            <Input 
              type="number" 
              className="w-full bg-transparent" 
              value={formData.salePrice}
              onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
            Category
          </label>
          <Select 
            value={formData.category} 
            onValueChange={(val) => setFormData({...formData, category: val})}
          >
            <SelectTrigger className="w-full bg-transparent">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Appliances">Appliances</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
            Description
          </label>
          <textarea 
            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1] ml-0.5">
            Image URL / Upload
          </label>
          <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border-2 border-dashed border-[#cbd5e1] dark:border-[#334155] p-3 transition-all bg-[#f8fafc] dark:bg-transparent">
            <label className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer border border-[#cbd5e1] dark:border-[#334155] rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-transparent text-[#334155] dark:text-[#cbd5e1] font-medium text-sm shrink-0 transition-colors">
              <ImagePlus className="h-4 w-4" />
              Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            <div className="flex w-full items-center gap-2">
              <span className="text-sm text-slate-400 whitespace-nowrap shrink-0">or URL:</span>
              <Input 
                className="flex-1 min-w-0 bg-transparent border-none shadow-none focus-visible:ring-0 px-0 rounded-none h-8" 
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Button 
          className="w-full bg-[#108970] hover:bg-[#0c6b57] text-white font-medium text-base py-6 shadow-sm rounded-lg"
          onClick={handleSave}
        >
          Save Product
        </Button>
      </div>
    </div>
  );
}
