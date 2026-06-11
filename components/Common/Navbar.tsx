"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu , setShowMenu] = useState(false);
  // Premium Menu Names
  const navLinks = [
    { name: "Discover", href: "/" },
    { name: "New Drops", href: "/new-arrivals" },
    { name: "Collections", href: "/collections", hasDropdown: true },
    { name: "Trending", href: "/trending" },
    { name: "Sale", href: "/sale" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white text-center py-2 text-[11px] tracking-[0.25em] uppercase">
        Free Shipping on Orders Over $75
      </div>

      <nav className="bg-white text-slate-800 border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-4">
          <div className="flex items-center justify-between h-[72px] gap-4">
            
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="font-black tracking-[0.25em] text-indigo-500 text-xl"
              >
                SPARKLE
              </Link>
              <span className="text-indigo-500 ml-1 text-lg">✦</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>
              ))}
            </div>

            {/* Premium Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search styles, collections..."
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/cart"
                className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <div
              onClick={()=>setShowMenu(!showMenu)}
                className="relative  p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
              >
                {
                  showMenu ? <X /> : <User className="w-5 h-5" />
                }

                {
                  showMenu && (
                    <ul className="absolute top-full right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-slate-100 rounded">Profile</li>
                  <li className="p-2 hover:bg-slate-100 rounded">Orders</li>
                  <li className="p-2 hover:bg-slate-100 rounded">Logout</li>
                  <li className="p-2 hover:bg-slate-100 rounded"><Link href= "/dashboard">Dashboard</Link></li>
                </ul>
                  )
                }
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 md:hidden">
              <Link
                href="/cart"
                className="p-2.5 rounded-full bg-slate-50 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full bg-slate-50"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-slate-100 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <span className="font-black tracking-[0.25em] text-slate-900">
              SPARKLE
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search styles..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-3 font-medium pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Icons */}
            <div className="pt-4 border-t border-slate-100 flex ">
              
              <div
              onClick={()=>setShowMenu(!showMenu)}
                className="relative  p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
              >
                {
                  showMenu ? <X /> : <User className="w-5 h-5" />
                }

                {
                  showMenu && (
                    <ul className="absolute top-full left-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-slate-100 rounded">Profile</li>
                  <li className="p-2 hover:bg-slate-100 rounded">Orders</li>
                  <li className="p-2 hover:bg-slate-100 rounded">Logout</li>
                  <li className="p-2 hover:bg-slate-100 rounded"><Link href= "/dashboard">Dashboard</Link></li>
                </ul>
                  )
                }
              </div>



            </div>            
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </nav>
    </>
  );
}