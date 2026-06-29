import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CartItemsList from "@/components/Lists-Cards/CartProductList";
import CheckoutForm from "@/components/Forms/CartCustomarForm";
import { envFile } from "@/config/env";
import { cookies } from "next/headers";




export default async function CartPage() {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const res = await fetch(`${envFile.BACKEND_URL}/carts/cart-products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieString
    },
    cache: "no-store"
  })

  const data = await res.json();
  const initialCartItems = data.data || []



  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* টপ হেডার */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500 font-medium">Manage your items and complete secure checkout</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>

      {/* মেইন গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* বাম পাশ: কার্ট প্রোডাক্ট লিস্ট কম্পোনেন্ট */}
        <div className="lg:col-span-7">
          <CartItemsList initialItems={initialCartItems} />
        </div>

        {/* ডান পাশ: কাস্টমার চেকআউট ফর্ম কম্পোনেন্ট */}
        <div className="lg:col-span-5">
          <CheckoutForm cartItems={initialCartItems} />
        </div>
      </div>

    </div>
  );
}