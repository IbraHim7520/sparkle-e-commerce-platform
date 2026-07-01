import React from "react";
import { Ticket, ArrowLeft, Sparkles, Bell } from "lucide-react";

export default function CouponsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-120px)] bg-slate-50/50">
      
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 text-center shadow-2xs space-y-6 relative overflow-hidden">
        
        {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ গ্লো */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-50/50 rounded-full blur-2xl pointer-events-none" />

        {/* আইকন এবং ব্যাজ সেকশন */}
        <div className="space-y-3 relative z-10">
          <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner animate-pulse">
            <Ticket size={28} className="-rotate-12" />
          </div>
          
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
            <Sparkles size={10} /> Feature Launching Soon
          </span>
        </div>

        {/* টেক্সট কন্টেন্ট */}
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Coupons & Discounts
          </h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            We are building a smart reward module. Soon you'll be able to apply promo codes, unlock tier discounts, and manage campaign vouchers directly from here.
          </p>
        </div>

        {/* স্ট্যাটিক অ্যাকশন এলিমেন্ট (সার্ভার সাইড সেফ) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <a
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </a>
          
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            <Bell size={14} />
            Notify Me
          </button>
        </div>

        {/* একটি সাবটেল প্রগ্রেস লাইন সিমুলেশন */}
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-4">
          <div className="bg-linear-to-r from-indigo-500 to-purple-500 h-full w-3/4 rounded-full" />
        </div>

      </div>

    </div>
  );
}