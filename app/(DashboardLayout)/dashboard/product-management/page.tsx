// app/dashboard/product-management/page.tsx
import React from "react";
import Link from "next/link";
import { Plus, Package, AlertTriangle, XCircle } from "lucide-react";
import { envFile } from "@/config/env";
import { IGetAllProductsData, ProductStatus } from "@/interfaces/products.interface";
import AllProductsList from "@/components/Lists/AllProductsList";



async function getProducts() {
  try {
    const response = await fetch(`${envFile.BACKEND_URL}/products/all-products-list`);
    const result = await response.json();
   
    
    return result.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductManagementPage() {
  const products:IGetAllProductsData[] = await getProducts();
  console.log(products)

  const totalProducts = products.length
  const lowStock = products.filter(p => p.stock <= 10).length
  const outOfStock = products.filter(p => p.productStatus === ProductStatus.OUT_OF_STOCK).length

  return (
    <div className="w-full space-y-6">
      
      {/* 1. Enhanced Header Section with Glassmorphism Touch */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
        {/* background glowing accent blob */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your store's inventory, check stock statuses, and update pricing.
          </p>
        </div>
        
        <Link
          href="/dashboard/upload-product"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-lg hover:shadow-indigo-600/20 active:shadow-none transition-all duration-200 self-start md:self-auto group"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90 duration-200" />
          Add Product
        </Link>
      </div>

      {/* 2. Mini Overview Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            <Package size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Items</p>
            <h3 className="text-xl font-bold text-slate-800">{totalProducts}</h3>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock</p>
            <h3 className="text-xl font-bold text-slate-800">{lowStock}</h3>
          </div>
        </div>

        {/* Out of Stock Items */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
            <XCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</p>
            <h3 className="text-xl font-bold text-slate-800">{outOfStock}</h3>
          </div>
        </div>
      </div>

      {/* 3. Interactive Client-Side Product List Container */}
      <div className="relative">
            <AllProductsList products={products}/>
      </div>

    </div>
  );
}