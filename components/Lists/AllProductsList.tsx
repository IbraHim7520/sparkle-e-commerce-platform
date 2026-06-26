"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  ArrowUpDown, 
  Calendar, 
  DollarSign, 
  Layers, 
  SlidersHorizontal,
  Trash2,
  Edit2,
  Image as ImageIcon
} from "lucide-react";
import { IGetAllProductsData } from "@/interfaces/products.interface";

// ProductStatus Enum (আপনার দেওয়া ডেটা অনুযায়ী)
export enum ProductStatus {
  IN_STOCK = "IN_STOCK",
  UPCOMING = "UPCOMING",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

interface AllProductsListProps {
  products: IGetAllProductsData[];
}

const AllProductsList = ({ products: initialProducts }: AllProductsListProps) => {
  // States
  const [products, setProducts] = useState<IGetAllProductsData[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); 
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(10000); 


  const handleStatusChange = (productId: string, newStatus: ProductStatus) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product._id === productId) {
          let updatedStock = product.stock;
          if (newStatus === ProductStatus.OUT_OF_STOCK) updatedStock = 0;
          if (newStatus === ProductStatus.IN_STOCK && product.stock === 0) updatedStock = 10; // Default fill

          return { 
            ...product, 
            productStatus: newStatus,
            stock: updatedStock
          };
        }
        return product;
      })
    );
    console.log(`Product ${productId} status updated to ${newStatus}`);
  };

  // সার্চ, ফিল্টার এবং সর্টিং মেমোজাইজড লজিক (Performance Optimized)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // ১. সার্চ কুয়েরি ফিল্টার
    if (searchQuery.trim() !== "") {
      result = result.filter(p => 
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.productCategoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ২. স্ট্যাটাস ফিল্টার
    if (statusFilter !== "ALL") {
      result = result.filter(p => p.productStatus === statusFilter);
    }

    // ৩. ম্যাক্সিমাম প্রাইস ফিল্টার
    result = result.filter(p => p.productPrice <= maxPrice);

    // ৪. সর্টিং অ্যালগরিদম
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.productPrice - a.productPrice);
    } else if (sortBy === "date-desc") {
      result.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return result;
  }, [products, searchQuery, sortBy, statusFilter, maxPrice]);

  return (
    <div className="space-y-6">
      
      {/* Utility কন্ট্রোল বার: সার্চ, ফিল্টার এবং সর্টিং */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4 justify-between">
        
        {/* সার্চ ইনপুট */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* ফিল্টার এবং সর্ট অপশনস গ্রুপ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          
          {/* সর্টিং ড্রপডাউন */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-desc">Latest Additions (Date)</option>
            </select>
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* স্ট্যাটাস ফিল্টার */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value={ProductStatus.IN_STOCK}>In Stock</option>
              <option value={ProductStatus.UPCOMING}>Upcoming</option>
              <option value={ProductStatus.OUT_OF_STOCK}>Out of Stock</option>
            </select>
            <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* ম্যাক্সিমাম প্রাইস স্লাইডার ফিল্টার */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 flex flex-col justify-center">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              <span>Max Price</span>
              <span className="text-indigo-600 font-mono">${maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="2000" 
              step="50"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg cursor-pointer" 
            />
          </div>

        </div>
      </div>

      {/* মেইন প্রোডাক্ট লিস্ট ভিউ */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* ডেস্কটপ হেডার রো */}
        <div className="hidden xl:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/60 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-4">Product Details</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1 text-center">Stock Qty</div>
          <div className="col-span-2 text-center">Status Selection</div>
          <div className="col-span-1 text-center">Color/Size</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* প্রোডাক্ট আইটেম লুপ */}
        <div className="divide-y divide-slate-100">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <div 
                key={product._id}
                className="grid grid-cols-1 xl:grid-cols-12 gap-3 xl:gap-4 px-6 py-4.5 items-center hover:bg-slate-50/30 transition duration-150"
              >
                
                {/* ১. প্রোডাক্ট ইনফো ও ইমেজ থাম্বনেইল */}
                <div className="col-span-1 xl:col-span-4 flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center shrink-0 overflow-hidden relative group/img">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition"
                      />
                    ) : (
                      <ImageIcon className="text-slate-400 w-5 h-5" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-slate-900 text-sm xl:text-base line-clamp-1">
                      {product.productName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                      <span className="xl:hidden bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {product.productCategoryName}
                      </span>
                      {product.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ২. ক্যাটাগরি (Desktop view) */}
                <div className="hidden xl:block col-span-2 text-sm text-slate-600 font-medium">
                  {product.productCategoryName}
                </div>

                {/* ৩. প্রাইস ও ডিসকাউন্ট */}
                <div className="col-span-1 xl:col-span-1 flex xl:block items-center justify-between text-sm">
                  <span className="xl:hidden text-xs text-slate-400 font-medium">Price:</span>
                  <div>
                    <span className="font-bold text-slate-900">${product.productPrice}</span>
                    {product.discount && product.discount > 0 ? (
                      <span className="block text-[11px] text-emerald-600 font-semibold">
                        -{product.discount}% Off
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* ৪. স্টক কোয়ান্টিটি কাউন্টার */}
                <div className="col-span-1 xl:col-span-1 flex xl:justify-center items-center justify-between text-sm">
                  <span className="xl:hidden text-xs text-slate-400 font-medium">Stock Count:</span>
                  <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-semibold ${
                    product.stock === 0 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"
                  }`}>
                    {product.stock} pcs
                  </span>
                </div>

                {/* ৫. ইন্টারেক্টিভ স্টক স্ট্যাটাস ড্রপডাউন (আপনার রিকোয়েস্ট অনুযায়ী) */}
                <div className="col-span-1 xl:col-span-2 flex xl:block items-center justify-between">
                  <span className="xl:hidden text-xs text-slate-400 font-medium">Manage Status:</span>
                  <div className="relative w-40 xl:w-full">
                    <select
                      value={product.productStatus}
                      onChange={(e) => handleStatusChange(product._id, e.target.value as ProductStatus)}
                      className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer transition shadow-xs ${
                        product.productStatus === ProductStatus.IN_STOCK
                          ? "bg-emerald-50/80 border-emerald-200 text-emerald-700 focus:border-emerald-400"
                          : product.productStatus === ProductStatus.UPCOMING
                          ? "bg-amber-50/80 border-amber-200 text-amber-700 focus:border-amber-400"
                          : "bg-rose-50/80 border-rose-200 text-rose-700 focus:border-rose-400"
                      }`}
                    >
                      <option value={ProductStatus.IN_STOCK}>🟢 In Stock</option>
                      <option value={ProductStatus.UPCOMING}>🟡 Upcoming</option>
                      <option value={ProductStatus.OUT_OF_STOCK}>🔴 Out of Stock</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* 🔴 ৬. কালার এবং সাইজ ব্যাজ */}
                <div className="col-span-1 xl:col-span-1 flex xl:justify-center items-center justify-between text-sm">
                  <span className="xl:hidden text-xs text-slate-400 font-medium">Attributes:</span>
                  <div className="flex gap-1.5">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                      {product.productSize || "N/A"}
                    </span>
                    <span 
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: product.productColor || "#ccc" }}
                      title={product.productColor}
                    />
                  </div>
                </div>

              
                <div className="col-span-1 xl:col-span-1 flex justify-end gap-1.5 pt-2.5 xl:pt-0 border-t xl:border-0 border-dashed border-slate-100">
                  <button 
                    title="Edit Product"
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    title="Delete Product"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

              </div>
            ))
          ) : (
           
            <div className="p-16 text-center text-slate-400">
              <p className="text-base font-semibold">No matching items found</p>
              <p className="text-xs mt-1 text-slate-400/80">Refine your active search query or filter cap limits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsList;