"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      title: "Oversized Street Hoodie",
      price: "$49",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    },
    {
      id: 2,
      title: "Minimalist White Tee",
      price: "$29",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 3,
      title: "Relaxed Fit Jacket",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1520975958225-7c8b1f2f2c6f",
    },
    {
      id: 4,
      title: "Urban Cargo Pants",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d",
    },
  ];

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
            <div
              key={p.id}
              className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-64 bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:text-rose-500">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium">{p.title}</h3>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-slate-900">
                    {p.price}
                  </span>

                  <button className="flex items-center gap-1 text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600">
                    <ShoppingBag className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}