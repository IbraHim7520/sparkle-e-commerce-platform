"use client";

import React, { useEffect, useState } from "react";
import { Layers, Search, SlidersHorizontal, ArrowUpDown, RotateCcw } from "lucide-react";
import axios from "axios";
import { envFile } from "@/config/env";
import { IGetAllProductsData } from "@/interfaces/products.interface";
import ProductCard from "@/components/Lists-Cards/ProductsCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<IGetAllProductsData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IGetAllProductsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>("default");

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${envFile.BACKEND_URL}/products/all-products-list`);
        const fetchedData = response.data?.data || [];
        setProducts(fetchedData);
        setFilteredProducts(fetchedData);

        const uniqueCategories: string[] = ["All", ...new Set(fetchedData.map((p: IGetAllProductsData) => p.productCategoryName || "Unknown")) as any];
        const uniqueBrands: string[] = ["All", ...new Set(fetchedData.map((p: IGetAllProductsData) => p.brandName || "Unknown")) as any];
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);

        if (fetchedData.length > 0) {
          const prices = fetchedData.map((p: IGetAllProductsData) => p.productPrice);
          setMaxPrice(Math.max(...prices, 2000));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.productCategoryName === selectedCategory);
    }

    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brandName === selectedBrand);
    }

    result = result.filter((p) => p.productPrice <= maxPrice);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.productPrice - a.productPrice);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice, sortBy, products]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSortBy("default");
    if (products.length > 0) {
      setMaxPrice(Math.max(...products.map((p) => p.productPrice), 2000));
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 text-center text-sm font-bold text-slate-500 font-mono tracking-wider">
        Initializing Inventory Pipeline Data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-xs gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Our Products</h1>
          <p className="text-xs text-slate-500 font-medium">Explore premium tech gadgets and custom mechanical setups</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
          <Layers size={14} className="text-indigo-600" />
          <span>Matches Found: {filteredProducts.length}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Query hardware parameters or functional keyword tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative inline-flex items-center">
              <span className="absolute left-3 text-slate-400 pointer-events-none">
                <ArrowUpDown size={14} />
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                <option value="default">Default Node Alignment</option>
                <option value="price-low">Price: Ascending Logistics</option>
                <option value="price-high">Price: Descending Logistics</option>
                <option value="newest">Chronological Order: Newest</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition shrink-0"
              title="Reset configuration filters"
            >
              <RotateCcw size={14} /> Clear System Controls
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          
          <div className="space-y-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Category Tier</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Manufacturer / Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <span>Price Ceiling Limit</span>
              <span className="text-indigo-600 font-mono text-xs">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={products.length > 0 ? Math.max(...products.map(p => p.productPrice), 2000) : 2000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 accent-indigo-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

        </div>

      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-2xs">
          <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <SlidersHorizontal size={18} />
          </div>
          <p className="text-sm font-bold text-slate-700">No Vector Intersections</p>
          <p className="text-slate-400 text-xs max-w-xs mx-auto mt-1">
            Adjust your keyword strings or parameter inputs. No active listings conform to the filtered criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}

    </div>
  );
}