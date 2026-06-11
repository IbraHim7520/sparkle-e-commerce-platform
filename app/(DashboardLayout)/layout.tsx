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
  Settings,
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
          path: "/dashboard/upload",
          icon: <Upload size={20} />,
        },
        {
          name: "Manage Products",
          path: "/dashboard/products",
          icon: <Box size={20} />,
        },
        {
          name: "Categories",
          path: "/dashboard/category",
          icon: <Scroll size={20} />,
        },
      ],
    },
    {
      label: "ORDER MANAGEMENT",
      items: [
        {
          name: "Orders",
          path: "/dashboard/order",
          icon: <Boxes size={20} />,
        },
        {
          name: "Returns",
          path: "/dashboard/returns",
          icon: <RotateCcw size={20} />,
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
        {
          name: "Advertisements",
          path: "/dashboard/ads",
          icon: <ImagePlus size={20} />,
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
    {
      label: "SETTINGS",
      items: [
        {
          name: "Settings",
          path: "/dashboard/settings",
          icon: <Settings size={20} />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">

        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </button>

          <Link
            href="/"
            className="font-black tracking-[0.25em] text-indigo-500 text-xl"
          >
            SPARKLE
          </Link>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button className="border rounded-full text-sm px-4 py-1">
            Logout
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1">

        {/* OVERLAY (mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 md:hidden z-40"
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed md:static top-0 left-0 z-50
            h-full md:h-auto
            w-64 bg-white border-r border-gray-400
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >

          {/* CLOSE BTN (mobile) */}
          <div className="md:hidden flex justify-between items-center p-4 border-b">
            <h2 className="font-bold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>

          {/* MENU */}
          <div className="overflow-y-auto h-[calc(100vh-60px)] p-2">
            {sidebarSections.map((section) => (
              <div key={section.label} className="mb-6">

                <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-slate-400">
                  {section.label}
                </h3>

                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="
                      flex items-center gap-3
                      px-4 py-3 rounded-lg
                      text-slate-600
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      transition-all
                    "
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-6 bg-slate-50">
          {children}
        </div>

      </div>
    </div>
  );
}