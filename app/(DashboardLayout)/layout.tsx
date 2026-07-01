"use client";

import {
  LayoutDashboard,
  Upload,
  Scroll,
  Box,
  Boxes,
  Star,
  TicketPercent,
  ImagePlus,
  Users,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarSections = [
    {
      label: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <LayoutDashboard size={20} />,
        },
      ],
    },
    {
      label: "PRODUCT MANAGEMENT",
      items: [
        {
          name: "Upload Product",
          path: "/dashboard/upload-product",
          icon: <Upload size={20} />,
        },
        {
          name: "Manage Products",
          path: "/dashboard/product-management",
          icon: <Box size={20} />,
        },
        {
          name: "Categories",
          path: "/dashboard/categories-management",
          icon: <Scroll size={20} />,
        },
      ],
    },
    {
      label: "ORDER MANAGEMENT",
      items: [
        {
          name: "Orders",
          path: "/dashboard/orders",
          icon: <Boxes size={20} />,
        },
      ],
    },
    {
      label: "MARKETING",
      items: [
        {
          name: "Coupons",
          path: "/dashboard/coupons",
          icon: <TicketPercent size={20} />,
        },
      ],
    }, 
    {
      label: "CUSTOMERS",
      items: [
        {
          name: "Reviews",
          path: "/dashboard/reviews",
          icon: <Star size={20} />,
        },
        {
          name: "Customers",
          path: "/dashboard/customers",
          icon: <Users size={20} />,
        },
      ],
    },
  ];

  return (
    // Prevent the root viewport container from scrolling entirely
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50">

      {/* FIXED TOP BAR */}
      <div className="sticky top-0 z-50 h-[64px] flex items-center justify-between px-4 md:px-8 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded-md hover:bg-slate-100 text-slate-600 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <Link
            href="/"
            className="font-black tracking-[0.25em] text-indigo-600 text-xl"
          >
            SPARKLE
          </Link>
        </div>

        <div className="flex items-center gap-4 text-slate-600 text-sm font-medium">
          <p>Hi, Admin</p>
          <button className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition rounded-full px-4 py-1.5 font-semibold text-slate-700">
            Logout
          </button>
        </div>
      </div>

      {/* DASHBOARD BODY PANEL */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/40 md:hidden z-40 transition-opacity"
          />
        )}

        {/* STATIC SIDEBAR CONTAINER */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            h-full md:h-full w-64 bg-white border-r border-slate-200
            flex flex-col shrink-0
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          {/* MOBILE CLOSE ACTION HEADER */}
          <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Navigation Menu</h2>
            <button 
              className="p-1 rounded-md hover:bg-slate-100 text-slate-500" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* INNER SIDEBAR MENU (Independently scrollable if menu items grow too long) */}
          <div className="overflow-y-auto flex-1 p-3 space-y-6 custom-scrollbar">
            {sidebarSections.map((section) => (
              <div key={section.label} className="space-y-1">
                <h3 className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {section.label}
                </h3>

                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="
                      flex items-center gap-3
                      px-3 py-2.5 rounded-xl
                      text-sm font-medium text-slate-600
                      hover:bg-indigo-50/70 hover:text-indigo-600
                      transition-all duration-150
                    "
                  >
                    <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* INDEPENDENTLY SCROLLABLE MAIN CONTENT REGION */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 focus:outline-none">
          <div className="w-full  mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}