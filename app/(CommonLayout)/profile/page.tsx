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
  Clock 
} from "lucide-react";
import { useLayoutContext } from "@/utils/useLayoutContext";
import axios from "axios";
import { envFile } from "@/config/env";




const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "orders">("settings");
  const {user, setUser , cartLength} = useLayoutContext()
  const [myOrders , setMyOrders] = useState<any[]>([])
  useEffect(()=>{
    const fetchMyOrders = async()=>{
      const response = await axios.get(`${envFile.BACKEND_URL}/orders/my-orders`, {
        withCredentials:true
      })
      setMyOrders(response.data.data)
    }
    fetchMyOrders()
  },[])
  console.log(myOrders)
  const [orders] = useState<IOrder[]>([
    { orderId: "ORD-9921", date: "25 June 2026", totalAmount: 518.00, status: "Delivered", itemsCount: 3 },
    { orderId: "ORD-8712", date: "12 June 2026", totalAmount: 120.00, status: "Processing", itemsCount: 1 },
    { orderId: "ORD-4510", date: "01 May 2026", totalAmount: 89.99, status: "Pending", itemsCount: 2 },
  ]);


  const [newName, setNewName] = useState(user?.name);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const handleUpdateName = (e: React.FormEvent) => {
    alert("Name updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    alert("Password updated successfully!");
  };

  const handleLogout = () => {
   alert("logout")
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* ১. টপ প্রোফাইল ব্যানার/হেডার */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl tracking-wider uppercase shadow-inner">
          {user?.name.split(" ").map(n => n[0]).join("")}
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

        {/* ডান পাশ: কন্টেন্ট প্যানেল (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* ট্যাব ১: প্রোফাইল চেঞ্জ ও সিকিউরিটি সেটিংস */}
          {activeTab === "settings" && (
            <>
              {/* নাম পরিবর্তন ফর্ম */}
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

              {/* পাসওয়ার্ড পরিবর্তন ফর্ম */}
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

          {/* ট্যাব ২: অর্ডার হিস্ট্রি লিস্ট */}
          {activeTab === "orders" && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Order Logs</h3>
                <p className="text-xs text-slate-400">Track and monitor status invoices of your purchases</p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">No order logs found in your system.</div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.orderId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/40 gap-3 hover:border-slate-200 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800 font-mono">{order.orderId}</span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            order.status === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                            order.status === "Processing" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                          }`}>
                            {order.status === "Delivered" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{order.date} • {order.itemsCount} Items purchased</p>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <span className="block text-sm font-black text-slate-900 font-mono">${order.totalAmount.toFixed(2)}</span>
                        <button type="button" className="text-[11px] font-bold text-indigo-600 hover:underline mt-0.5">View Invoice Details</button>
                      </div>
                    </div>
                  ))}
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