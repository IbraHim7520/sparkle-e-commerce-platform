"use client";

import { useState } from "react";
import { User, Phone, MapPin, FileText, ShoppingBag } from "lucide-react";
import axios from "axios";
import { envFile } from "@/config/env";
import { ICartItem, IOrderCustomarInfo, IOrderData } from "@/interfaces/cart.interface";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface ICheckoutFormProps {
  cartItems: ICartItem[];
}

export default function CheckoutForm({ cartItems }: ICheckoutFormProps) {

  const {register , handleSubmit , reset} = useForm<IOrderCustomarInfo>()
  const [submitting, setSubmitting] = useState(false);

  const totalProductPrice = cartItems.map(item=>{
    const price = item.quantity * Number(item.productPrice);
    return price
  })
  const subtotal = totalProductPrice.reduce((acc,price)=>acc + price , 0)

   const shipping = 80;
   const grandTotal = subtotal + shipping;
 
  const onSubmit = async (data:IOrderCustomarInfo) => {
    
    const cartIds = cartItems.map(item=>{
      return item._id
    })
    const produtcIds = cartItems.map(item=>{
      return item.productId
    })

    const orderData: IOrderData = {
      customarName: data.customarName,
      customarPhone: data.customarPhone, 
      customarAddress: data.customarAddress,
      customarAdditionalNotes: data.customarAdditionalNotes,
      cartIds: cartIds,
      produtcIds: produtcIds
    }

    try {
      const orderResponse = await axios.post(`${envFile.BACKEND_URL}/orders/create-order`, orderData, {
        withCredentials:true
      });
      if(orderResponse.data.data){
        toast.success("Order placed successfully")
        reset()
        window.location.reload();
      }
    } catch (error:any) {
      console.log(error.response.data.message)
      toast.error("Failed to place order")
    }

  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Checkout Details</h2>
        <p className="text-xs text-slate-400">Provide shipping coordinates to complete invoice</p>
      </div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* কাস্টমার নেম */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
              <User size={15} />
            </span>
            <input
              type="text"
              required
              placeholder="John Doe"
              {...register("customarName")}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-slate-800 transition font-medium"
            />
          </div>
        </div>

        {/* ফোন নাম্বার */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
              <Phone size={15} />
            </span>
            <input
              type="tel"
              required
              placeholder="+880 000-0000"
              {...register("customarPhone")}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-slate-800 transition font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Shipping Address</label>
          <div className="relative">
            <span className="absolute top-3 left-3 text-slate-400 pointer-events-none">
              <MapPin size={15} />
            </span>
            <textarea
              required
              rows={3}
              placeholder="Street address, city, state, zip code"
              {...register("customarAddress")}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-slate-800 transition font-medium resize-none"
            />
          </div>
        </div>

        {/* এডিশনাল নোট */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Note (Optional)</label>
          <div className="relative">
            <span className="absolute top-3 left-3 text-slate-400 pointer-events-none">
              <FileText size={15} />
            </span>
            <textarea
              rows={2}
              placeholder="Special instructions for logistics delivery..."
              {...register("customarAdditionalNotes")}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-slate-800 transition font-medium resize-none"
            />
          </div>
        </div>

        {/* প্রাইজ ব্রেকডাউন */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Subtotal</span>
            <span className="font-mono">${subtotal}</span>
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Shipping Fee</span>
            <span className="font-mono">${shipping}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
            <span>Grand Total</span>
            <span className="font-black font-mono text-indigo-600">${grandTotal}</span>
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <button
          type="submit"
          disabled={submitting || cartItems.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm shadow-indigo-600/10 disabled:opacity-50"
        >
          <ShoppingBag size={16} />
          {submitting ? "Processing Order..." : "Place Order Now"}
        </button>

      </form>
    </div>
  );
}