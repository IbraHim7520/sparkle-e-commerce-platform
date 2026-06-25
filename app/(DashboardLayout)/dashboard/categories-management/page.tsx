"use client";

import React from "react";

// Mock data structure for categories
interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  status: "Active" | "Inactive";
}

const initialCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", productCount: 142, status: "Active" },
  { id: "2", name: "Fashion & Apparel", slug: "fashion", productCount: 89, status: "Active" },
  { id: "3", name: "Home & Living", slug: "home-living", productCount: 64, status: "Active" },
  { id: "4", name: "Beauty & Personal Care", slug: "beauty", productCount: 37, status: "Inactive" },
  { id: "5", name: "Sports & Outdoors", slug: "sports-outdoors", productCount: 51, status: "Active" },
];

export default function CategoriesManagementPage() {
  const handleAddCategory = () => {
    // Action trigger for opening a modal or navigating to a creation route
    console.log("Add category clicked");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 ">
      <div className="w-full  mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 ">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Categories Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, edit, and organize your store's product classifications.
            </p>
          </div>
          
          {/* Top Right Action Button */}
          <button
            onClick={handleAddCategory}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition self-start sm:self-auto group"
          >
            {/* Plus Icon SVG */}
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Category
          </button>
        </div>

        {/* Categories List Container */}
        <div className="bg-white rounded-2xl  border border-slate-100 overflow-hidden">
          
          {/* List Headers (Visible on desktop screens) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/70 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <div className="col-span-4">Category Name</div>
            <div className="col-span-3">URL Slug</div>
            <div className="col-span-2 text-center">Products</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* List Rows */}
          <div className="divide-y divide-slate-100">
            {initialCategories.map((category) => (
              <div
                key={category.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-slate-50/40 transition duration-150"
              >
                {/* Name & Title */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 shrink-0">
                    {category.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {category.name}
                    </h3>
                    <span className="md:hidden text-xs text-slate-400 block mt-0.5">
                      Slug: /{category.slug}
                    </span>
                  </div>
                </div>

                {/* Slug (Hidden on mobile context, fallback string embedded above) */}
                <div className="hidden md:block col-span-3 text-sm text-slate-600 font-mono">
                  /{category.slug}
                </div>

                {/* Product Count Metric */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-1.5 md:gap-0 text-sm text-slate-600">
                  <span className="md:hidden text-xs text-slate-400 font-medium">Items: </span>
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-700">
                    {category.productCount} items
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-1.5 md:gap-0">
                  <span className="md:hidden text-xs text-slate-400 font-medium">Status: </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      category.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        category.status === "Active" ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    />
                    {category.status}
                  </span>
                </div>

                {/* Quick Row Actions */}
                <div className="col-span-1 md:col-span-1 flex justify-end gap-3 md:gap-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-0 border-dashed border-slate-100">
                  <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition px-2 py-1 hover:bg-indigo-50 rounded-md">
                    Edit
                  </button>
                  <button className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition px-2 py-1 hover:bg-rose-50 rounded-md">
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}