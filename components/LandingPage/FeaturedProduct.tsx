"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { IGetAllProductsData } from "@/interfaces/products.interface";
import axios from "axios";
import { envFile } from "@/config/env";
import ProductCard from "../Lists-Cards/ProductsCard";

export function FeaturedProducts() {
  const [products ,setFeaturedProducts] = useState<IGetAllProductsData[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    const fetchingData = async()=>{
      const response =  await axios.get(`${envFile.BACKEND_URL}/products/featured/products`);
      setFeaturedProducts(response.data.data)
      setLoading(false)
    }
    fetchingData()
  },[])



  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-3 lg:px-4">
        
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Handpicked items for your style
            </p>
          </div>

          <Link
            href="/shop"
            className="text-sm text-indigo-600 font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p) => (
              <ProductCard p={p}/>
          ))}
        </div>
      </div>
    </section>
  );
}