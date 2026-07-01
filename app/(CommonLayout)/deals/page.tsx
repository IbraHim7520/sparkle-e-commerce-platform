import { envFile } from "@/config/env";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Flame, Percent, ArrowRight, ShieldCheck } from "lucide-react";

export interface IGetAllProductsData {
  _id: string;
  productName: string;
  productPrice: number;
  productCategoryName: string; 
  stock: number;
  discount?: number;
  productStatus: "Active" | "Inactive";
  images: string[];
  productSizes: string[];       
  productColors: string[];      
  productDescription: string;
  productAdditionalInfo?: string;
  tags?: string[];
  brandName: string;            
  createdAt?: string;
  updatedAt?: string;
}

export default async function DealsPage() {
  let products: IGetAllProductsData[] = [];

  try {
    const dealsProducts = await fetch(`${envFile.BACKEND_URL}/products/all-fetured-product`, {
      cache: "no-store",
    });
    const jsonRes = await dealsProducts.json();
    products = jsonRes.data || [];
  } catch (error) {
    console.error("Error fetching deals products:", error);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-16">
      
      {/* ১. প্রোমোশনাল ব্যানার সেকশন */}
      <div className="w-full bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={12} className="text-indigo-400 fill-indigo-400" /> Limited Flash Deals
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              Premium Selections <br />
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
                Up To 50% Off
              </span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-sm leading-relaxed">
              Unlock exclusive allocations on highly-rated featured systems. Authorized enterprise-grade quality guaranteed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xs w-full md:w-auto shrink-0">
            <div className="text-center min-w-[70px]">
              <p className="text-2xl font-black text-amber-400 font-mono tracking-tight">02</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Days</p>
            </div>
            <span className="text-slate-600 font-bold">:</span>
            <div className="text-center min-w-[70px]">
              <p className="text-2xl font-black text-white font-mono tracking-tight">14</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hours</p>
            </div>
            <span className="text-slate-600 font-bold">:</span>
            <div className="text-center min-w-[70px]">
              <p className="text-2xl font-black text-white font-mono tracking-tight">45</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mins</p>
            </div>
          </div>

        </div>
      </div>

      {/* ২. মেইন প্রোডাক্টস কন্টেইনার */}
      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Flame size={18} className="text-orange-500 fill-orange-500" /> Featured Direct Nodes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Explore our top verified curated hardware logs currently active inside our catalog pipelines</p>
          </div>
          <span className="text-xs text-slate-400 font-semibold bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
            Showing {products.length} Products Available
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-2xs">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xs mb-3">
              <ShoppingBag size={20} />
            </div>
            <p className="text-sm font-bold text-slate-700">No Premium Deals Logged</p>
            <p className="text-slate-400 text-xs max-w-xs mx-auto mt-1">
              There are currently no registered inventory entities matching parameters within our deployment records.
            </p>
          </div>
        ) : (
          /* ৩. প্রোডাক্টস গ্রিড লেআউট */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const hasDiscount = product.discount && product.discount > 0;
              const computedPrice = hasDiscount 
                ? product.productPrice - (product.productPrice * (product.discount! / 100))
                : product.productPrice;

              return (
                <div 
                  key={product._id} 
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-300 flex flex-col group relative"
                >
                  
                  {/* ডিসকাউন্ট ব্যাজ */}
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black font-mono px-2 py-0.5 rounded-lg z-20 flex items-center gap-0.5 shadow-xs">
                      <Percent size={10} /> -{product.discount}% OFF
                    </span>
                  )}

                  {/* প্রোডাক্ট ইমেজ কন্টেইনার */}
                  <div className="w-full aspect-square bg-slate-50 border-b border-slate-100 relative overflow-hidden flex items-center justify-center p-4 shrink-0">
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.productName}
                      width={300}
                      height={300}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-10">
                        <span className="bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl shadow-md">
                          Depleted Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* প্রোডাক্ট বিবরণী বডি */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{product.productCategoryName}</span>
                        <span className="text-slate-500 font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                          {product.brandName}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 tracking-tight text-sm line-clamp-1 group-hover:text-indigo-600 transition">
                        {product.productName}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {product.productDescription}
                      </p>
                    </div>

                    {/* প্রাইসিং ও অ্যাকশনস */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900 font-mono">
                          ${computedPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs font-bold font-mono text-slate-400 line-through">
                            ${product.productPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-5 gap-2 border-t border-slate-50 pt-3">
                        <Link 
                          href={`/products/${product._id}`}
                          className="col-span-4 inline-flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors duration-200"
                        >
                          <ShoppingBag size={13} /> Buy Position
                        </Link>
                        <Link 
                          href={`/products/${product._id}`}
                          className="col-span-1 inline-flex items-center justify-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-xl transition"
                          title="View system specifics"
                        >
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}