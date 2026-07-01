"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, HelpCircle, ShieldAlert } from "lucide-react";

export default function NotFoundComponent() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 to-violet-500/10 blur-3xl rounded-full max-w-xs mx-auto -z-10" />
          
          <div className="relative bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-center justify-center w-32 h-32">
            <span className="text-5xl font-black font-mono tracking-tighter bg-linear-to-br from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              404
            </span>
            <span className="absolute -bottom-2 -right-2 bg-rose-50 border border-rose-100 text-rose-500 p-1.5 rounded-xl shadow-2xs animate-bounce">
              <ShieldAlert size={16} />
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Oops! Route Interrupted
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-medium max-w-sm mx-auto leading-relaxed">
            The endpoint or resource cluster you are trying to resolve does not exist or has been shifted within our deployment stack.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition"
          >
            <ArrowLeft size={14} /> Go Backward
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors"
          >
            <Home size={14} /> Return Root Node
          </Link>
        </div>
        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <Link href="/support" className="hover:text-indigo-600 flex items-center gap-1 transition">
            <HelpCircle size={12} /> Contact System Ops
          </Link>
        </div>

      </div>
    </div>
  );
}