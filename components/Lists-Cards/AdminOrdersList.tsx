"use client";

import { useState } from "react";
import { 
  Search, 
  Package, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 

  Tag
} from "lucide-react";
import Image from "next/image";
import { IGetMyOrderedData } from "@/interfaces/cart.interface";
import axios from "axios";
import { envFile } from "@/config/env";
import toast from "react-hot-toast";

interface AdminOrdersListProps {
  orders: IGetMyOrderedData[];
}

export default function AdminOrdersList({ orders: initialOrders }: AdminOrdersListProps) {
  const [orders, setOrders] = useState<IGetMyOrderedData[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      const UpdateStats = {
        orderStatus: newStatus,
      }
      if(confirm("Are you sure you want to update the status?")){
        const stausUpdateResponse = await axios.patch(`${envFile.BACKEND_URL}/orders/stat-change/${orderId}`,
         UpdateStats ,
        {
          withCredentials: true
        })
      if(stausUpdateResponse.data.data.modifiedCount > 0){
        toast.success(`Order status changed to ${newStatus} successfully.`)
      }  
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customarName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter =
      selectedStatus === "All" || order.orderStatus === selectedStatus;

    return matchesSearch && matchesStatusFilter;
  });

  return (
    <div className="space-y-6">
      
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by Order ID, tags (e.g. Processing, Delivered), or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-44 px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Pipelines</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        /* নো অর্ডার ফাউন্ড এম্পটি স্টেট */
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
          <div className="text-center py-20 text-slate-400 text-xs font-medium space-y-3">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Package size={22} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1 px-4">
              <p className="text-sm font-bold text-slate-700 tracking-tight">No Orders Found</p>
              <p className="text-slate-400 max-w-xs mx-auto text-[11px] leading-relaxed">
                There are currently no active purchase records or matching query parameters in the database.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Invoice metadata</th>
                  <th className="p-4">Client Records</th>
                  <th className="p-4">Products Stream</th>
                  <th className="p-4">Financials</th>
                  <th className="p-4">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {filteredOrders.map((order) => {
                  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={order._id} className="hover:bg-slate-50/30 transition">
                      
                      {/* ১. আইডি এবং তারিখ */}
                      <td className="p-4 space-y-1.5 align-top">
                        <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200/40 px-2.5 py-0.5 rounded font-mono inline-block">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                          <Calendar size={13} /> {formattedDate}
                        </div>
                      </td>
                      <td className="p-4 space-y-1 max-w-xs align-top">
                        <p className="font-bold text-slate-800 tracking-tight flex items-center gap-1">
                          <User size={13} className="text-slate-400" /> {order.customarName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Phone size={12} className="text-slate-400" /> {order.customarPhone}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-relaxed block">
                          <MapPin size={12} className="inline text-slate-300 mr-0.5 shrink-0" /> 
                          {order.customarAddress}
                        </p>
                        {order.customarAdditionalNotes && (
                          <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100/70 px-2 py-0.5 rounded-md mt-1 w-fit italic">
                            Note: "{order.customarAdditionalNotes}"
                          </p>
                        )}
                      </td>
                      <td className="p-4 max-w-sm align-top">
                        <div className="space-y-1.5">
                          {order.Orderitems?.map((item, idx) => (
                            <div key={item.productId + idx} className="flex items-center justify-between gap-3 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100/80 text-xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 bg-white border border-slate-200/80 rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative p-0.5">
                                  <Image
                                    src={item.image || "/placeholder.png"}
                                    alt={item.productName}
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                  />
                                </div>
                                <span className="font-bold text-slate-700 truncate max-w-[150px]" title={item.productName}>
                                  {item.productName}
                                </span>
                              </div>
                              <span className="font-black font-mono text-[11px] text-slate-400 shrink-0">
                                ${item.productPrice} x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 font-mono space-y-1 align-top shrink-0">
                        <p className="text-sm font-black text-slate-900 tracking-tight">
                          ${order.grandTotal.toFixed(2)}
                        </p>
                        <div className="text-[10px] text-slate-400 space-y-0.5 leading-none">
                          <p>Items: ${order.totalPrice}</p>
                          <p>Delivery: ${order.deliveryCharge}</p>
                        </div>
                      </td>


                      <td className="p-4 align-top">
                        <div className="space-y-2">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                            className={`w-full max-w-[130px] text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none transition cursor-pointer ${
                              order.orderStatus === "Delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                              order.orderStatus === "Processing" ? "bg-amber-50 text-amber-600 border-amber-200" :
                              order.orderStatus === "Cancelled" ? "bg-rose-50 text-rose-600 border-rose-200" :
                              "bg-blue-50 text-blue-600 border-blue-200"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 px-1">
                            <Tag size={10} /> {order.orderStatus}
                          </div>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}