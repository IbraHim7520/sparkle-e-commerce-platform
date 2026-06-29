import React from "react";
import { ShoppingCart, Star, Eye, Layers } from "lucide-react";
import Link from "next/link";
import { envFile } from "@/config/env";
import { IGetAllProductsData } from "@/interfaces/products.interface";
import ProductCard from "@/components/Lists-Cards/ProductsCard";



export default async function ProductsPage() {
  const productsResponse = await fetch(`${envFile.BACKEND_URL}/products/all-products-list`, {
    cache: "no-store"
  });
  const productData = await productsResponse.json();
  
  const products: IGetAllProductsData[] = productData?.data || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-xs gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Our Products</h1>
          <p className="text-xs text-slate-500 font-medium">Explore premium tech gadgets and custom mechanical setups</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
          <Layers size={14} className="text-indigo-600" />
          <span>Total Products: {products.length}</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 text-sm font-medium">
          No products found in the store. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}