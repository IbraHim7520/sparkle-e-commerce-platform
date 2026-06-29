"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ICartItem } from "@/interfaces/cart.interface";
import CartList from "./CartList";


export default function CartItemsList({ initialItems }: { initialItems: ICartItem[] }) {
  const [cartItems, setCartItems] = useState<ICartItem[]>(initialItems);



  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-12 text-center space-y-4">
        <ShoppingBag size={48} className="mx-auto text-slate-300 stroke-[1.5]" />
        <p className="text-slate-500 font-medium text-sm">Your cart is currently empty.</p>
        <Link href="/products" className="inline-flex px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cartItems.map(item => 
        <CartList key={item._id} item={item}
         setCartItems={setCartItems}
         cartItems={cartItems}
         />
      )}
    </div>
  );
}