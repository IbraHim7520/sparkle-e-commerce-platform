"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import banner1 from  "@/assets/hero_banner1.jpg"
import banner2 from  "@/assets/hero_banner2.jpg"

export default function FreshModernHero() {
  return (
    <section className="relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      

      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/80 hidden lg:block" />
      <div className="absolute top-1/4 right-12 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
        
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Dynamic Tag */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase mx-auto lg:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-200" />
              <span>Dropping Today / Summer 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Wear the energy. <br />
              <span className="underline decoration-indigo-500 decoration-wavy decoration-3 underline-offset-10">
                Own your <span className="text-indigo-500">glow</span>.
              </span>
            </h1>

            {/* Simple Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Sparkle presents curated street-to-office capsules. Premium fabrics engineered for comfort, tailored cleanly for individual expression.
            </p>

            {/* Structured Modern CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/shop-all" 
                className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>New Drops</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button 
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-all text-center"
              >
                Browse
              </button>
            </div>

            {/* Minimalist Trust Factors */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md border-t border-slate-100 mx-auto lg:mx-0">
              <div>
                <p className="text-xs font-bold text-slate-900">⚡ Fast Shipping</p>
                <p className="text-xs text-slate-500">Free over $75</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">🔄 30-Day Returns</p>
                <p className="text-xs text-slate-500">Hassle-free swap</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-bold text-slate-900">⭐ 4.9 Rated</p>
                <p className="text-xs text-slate-500">By 15k+ shoppers</p>
              </div>
            </div>

          </div>

          {/* Right Side: Dual Offset Product Cards with Live Images (5 Columns) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[450px] lg:min-h-[520px]">
            
            {/* Primary Background Card (Shifted Top-Right) */}
            <div className="absolute top-4 right-4 sm:right-12 w-48 sm:w-64 aspect-3/4 bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex flex-col justify-between transform rotate-3 shadow-md hover:rotate-0 transition-transform duration-300 overflow-hidden group">
              {/* Product Image Wrapper */}
              <div className="relative w-full h-[70%] rounded-xl overflow-hidden bg-slate-200">
                <Image 
                  src={banner1} 
                  alt="Classic Oversized Yellow Hoodie"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-768px) 192px, 256px"
                />
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  01
                </div>
              </div>
              
              {/* Product Info */}
              <div className="pt-2 pb-1 px-1">
                <p className="text-xs font-bold text-slate-800 truncate">Classic Oversized Pullover</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-indigo-600 font-semibold">$49.00</p>
                  <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Apparel</span>
                </div>
              </div>
            </div>

            {/* Secondary Foreground Card (Shifted Bottom-Left) */}
            <div className="absolute bottom-4 left-4 sm:left-6 w-48 sm:w-64 aspect-3/4 bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col justify-between transform -rotate-6 z-20 hover:rotate-0 transition-transform duration-300 overflow-hidden group">
              {/* Product Image Wrapper */}
              <div className="relative w-full h-[70%] p-3">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-200">
                  <Image 
                    src={banner2}
                    alt="Premium Minimalist Outfit Showcase"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-w-768px) 192px, 256px"
                    priority
                  />
                  <span className="absolute top-2 left-2 bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                    HOT
                  </span>
                </div>
              </div>
              
              {/* Product Info & Call to Action */}
              <div className="px-3 pb-3 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-800 truncate">Relaxed Tailored Blazer</p>
                  <p className="text-xs text-indigo-600 font-bold">$85.00</p>
                </div>
                <div className="bg-slate-900 hover:bg-indigo-600 text-white py-1.5 rounded-lg text-center text-[10px] font-semibold tracking-wider uppercase transition-colors cursor-pointer">
                  Quick View
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}