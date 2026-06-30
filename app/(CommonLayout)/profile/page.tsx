"use client";

import React, { useEffect, useState } from "react";
import { 
  User, 
  Mail, 
  ShoppingBag, 
  Package, 
  Lock, 
  LogOut, 
  KeyRound, 
  Edit3, 
  CheckCircle2, 
  Clock,
  Star,
  MapPin,
  Phone,
  FileText,
  AlertCircle
} from "lucide-react";
import { useLayoutContext } from "@/utils/useLayoutContext";
import axios from "axios";
import { envFile } from "@/config/env";
import { IGetMyOrderedData } from "@/interfaces/cart.interface";
import Image from "next/image";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "orders">("settings");
  const { user, setUser, cartLength } = useLayoutContext();
  const [myOrders, setMyOrders] = useState<IGetMyOrderedData[]>([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await axios.get(`${envFile.BACKEND_URL}/orders/my-orders`, {
          withCredentials: true
        });
        if (response.data?.data) {
          setMyOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchMyOrders();
  }, []);

  const [newName, setNewName] = useState(user?.name || "");
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
    }
  }, [user]);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Name updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  const handleLogout = () => {
    alert("logout");
  };

  const handleGiveReview = (productId: string) => {
    alert(`Redirecting to review system for product ID: ${productId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* ইউজার হেডার কার্ড */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl tracking-wider uppercase shadow-inner">
          {user?.name ? user.name.split(" ").map((n: string) => n[0]).join("") : "U"}
        </div>
        <div className="text-center sm:text-left space-y-1 flex-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{user?.name}</h1>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5"><Mail size={13} /> {user?.email}</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md font-bold text-slate-700">Customer Account</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* সাইডবার নেভিগেশন */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-2">
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center justify-between p-3 text-sm font-semibold rounded-xl transition ${activeTab === "settings" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span className="inline-flex items-center gap-2.5"><User size={16} /> Profile Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between p-3 text-sm font-semibold rounded-xl transition ${activeTab === "orders" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span className="inline-flex items-center gap-2.5"><Package size={16} /> Order History</span>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold font-mono px-2 py-0.5 rounded-full">{myOrders.length}</span>
          </button>

          <a
            href="/cart"
            className="w-full flex items-center justify-between p-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <span className="inline-flex items-center gap-2.5"><ShoppingBag size={16} /> View Shopping Cart</span>
            <span className="bg-indigo-600 text-white text-xs font-bold font-mono px-2 py-0.5 rounded-full">{cartLength}</span>
          </a>

          <div className="border-t border-slate-100 my-2 pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 p-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <LogOut size={16} /> Log Out Account
            </button>
          </div>
        </div>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* ট্যাব: সেটিংস */}
          {activeTab === "settings" && (
            <>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Personal Information</h3>
                  <p className="text-xs text-slate-400">Update your account username display details</p>
                </div>
                <form onSubmit={handleUpdateName} className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="space-y-1.5 flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Edit3 size={15} /></span>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition h-fit w-full sm:w-auto shrink-0">
                    Save Changes
                  </button>
                </form>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Security Credentials</h3>
                  <p className="text-xs text-slate-400">Change your secure login password parameters</p>
                </div>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Lock size={14} /></span>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={passwordForm.currentPassword}
                          onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><KeyRound size={14} /></span>
                        <input
                          type="password"
                          required
                          placeholder="Minimum 6 characters"
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><KeyRound size={14} /></span>
                        <input
                          type="password"
                          required
                          placeholder="Re-type new password"
                          value={passwordForm.confirmPassword}
                          onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition">
                    Update Password
                  </button>
                </form>
              </div>
            </>
          )}

          {/* ট্যাব: অর্ডার হিস্ট্রি */}
          {activeTab === "orders" && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Order Logs</h3>
                <p className="text-xs text-slate-400">Track and monitor status invoices of your purchases</p>
              </div>

              {myOrders.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">
                  No order logs found in your system.
                </div>
              ) : (
                <div className="space-y-5">
                  {myOrders.map((order: IGetMyOrderedData) => {
                    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <div 
                        key={order._id} 
                        className="flex flex-col border border-slate-100 rounded-xl bg-white overflow-hidden hover:border-slate-200 transition shadow-xs"
                      >
                        {/* অর্ডার কার্ড টপবার */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-50/60 border-b border-slate-100 w-full">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800 bg-slate-200/80 px-2.5 py-0.5 rounded font-mono">
                                #{order._id.slice(-6).toUpperCase()}
                              </span>
                              
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                order.orderStatus === "Delivered" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                order.orderStatus === "Processing" ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                                "bg-blue-50 text-blue-600 border border-blue-100"
                              }`}>
                                {order.orderStatus === "Delivered" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                                {order.orderStatus}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-500 font-medium">
                              {formattedDate} • {order.Orderitems?.length || 0} {order.Orderitems?.length > 1 ? "Items" : "Item"} purchased
                            </p>
                          </div>

                          <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                            <span className="text-base font-black text-slate-900 font-mono">
                              ${order.grandTotal.toFixed(2)}
                            </span>
                            <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline">
                              <FileText size={12} /> View Invoice
                            </button>
                          </div>
                        </div>

                        {/* অর্ডারড প্রোডাক্ট লিস্ট (Orderitems) */}
                        <div className="p-4 border-b border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {order.Orderitems?.map((item, idx) => (
                            <div key={item.productId + idx} className="flex items-center justify-between gap-3 bg-slate-50/40 p-3 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 bg-white border border-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative p-1">
                                  <Image 
                                    width={60} 
                                    height={60} 
                                    src={item.image || "/placeholder.png"} 
                                    alt={item.productName} 
                                    className="max-w-full max-h-full object-contain" 
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-800 truncate tracking-tight mb-0.5">
                                    {item.productName}
                                  </p>
                                  <p className="text-[11px] font-black font-mono text-slate-500">
                                    ${item.productPrice.toFixed(2)} x {item.quantity}
                                  </p>
                                </div>
                              </div>

                              {order.orderStatus === "Delivered" && (
                                <button
                                  type="button"
                                  onClick={() => handleGiveReview(item.productId)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white text-[10px] font-bold rounded-lg transition shrink-0 border border-slate-200"
                                >
                                  <Star size={10} className="fill-current" />
                                  Review
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* কাস্টমার ডেলিভারি ও প্রাইস সামারি */}
                        <div className="p-4 bg-slate-50/20 text-xs text-slate-600 space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-700">
                                {order.customarName} <span className="text-slate-400 font-mono text-[11px]">({order.customarPhone})</span>
                              </p>
                              <p className="text-slate-500 text-[11px]">{order.customarAddress}</p>
                            </div>
                          </div>

                          {order.customarAdditionalNotes && (
                            <div className="flex items-start gap-2 border-t border-slate-100 pt-2 text-[11px]">
                              <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                              <p className="text-slate-500 italic">
                                <strong>Note:</strong> "{order.customarAdditionalNotes}"
                              </p>
                            </div>
                          )}

                          {/* সাবটোটাল ও ডেলিভারি চার্জ বার */}
                          <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-[11px] text-slate-400 font-mono font-medium">
                            <span>Subtotal: ${order.totalPrice.toFixed(2)}</span>
                            <span>Delivery: ${order.deliveryCharge.toFixed(2)}</span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;