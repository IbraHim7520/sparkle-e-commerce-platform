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
  AlertCircle,
  Send,
  MessageSquare,
  Trash2,
  Calendar
} from "lucide-react";
import { useLayoutContext } from "@/utils/useLayoutContext";
import axios from "axios";
import { envFile } from "@/config/env";
import { IGetMyOrderedData } from "@/interfaces/cart.interface";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { IGetAllReviews } from "@/interfaces/review.interface";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "orders" | "review">("settings");
  const { user, setUser, cartLength } = useLayoutContext();
  const [myOrders, setMyOrders] = useState<IGetMyOrderedData[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const router = useRouter();
  const [myReviews, setMyReviews] = useState<IGetAllReviews[]>([]);

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

  const fetchMyReview = async () => {
    try {
      const reviewsData = await axios.get(`${envFile.BACKEND_URL}/reviews/my-reviews`, {
        withCredentials: true
      });
      if (reviewsData.data) {
        const actualData = Array.isArray(reviewsData.data) 
          ? reviewsData.data 
          : reviewsData.data.data || [];
        setMyReviews(actualData);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyReview();
    }
  }, [user]);

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

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    router.push("/login");
  };

  const handleGiveReview = (productId: string) => {
    setProductId(productId);
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal.showModal();
  };

  const handleSubmitReview = async () => {
    if (!productId) {
      toast.error("No Product Found!");
      return (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
    }
    const reviewData = {
      rating: rating,
      comment: feedback,
      productId: productId
    };

    try {
      const reviewPostResponse = await axios.post(`${envFile.BACKEND_URL}/reviews/create-review`, reviewData, {
        withCredentials: true
      });
      if (reviewPostResponse.data.success) {
        toast.success(reviewPostResponse.data.message);
        setFeedback("");
        setRating(0);
        (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
        fetchMyReview();
      } else {
        toast.error(reviewPostResponse.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review permanently?")) return;

    try {
      const response = await axios.delete(`${envFile.BACKEND_URL}/reviews/delete/my-review/${reviewId}`, {
        withCredentials: true
      });
      if(response.data.success){
        setMyReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
        toast.success("Review deleted successfully!");
      }else{
        
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Could not remove the review. Try again.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      <dialog id="my_modal_3" className="modal backdrop-blur-xs">
        <div className="modal-box bg-white max-w-md rounded-2xl border border-slate-100 p-6 shadow-xl space-y-5">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-600 hover:bg-slate-100 absolute right-4 top-4 transition">
              ✕
            </button>
          </form>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" />
              Write a Product Review
            </h3>
            <p className="text-xs text-slate-400">
              Share your experience with this item to help other shoppers make informed choices.
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitReview();
            }} 
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Product Rating
              </label>
              <div className="rating rating-md flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="rating-product"
                    className="mask mask-star-2 bg-amber-400"
                    value={num}
                    checked={rating === num}
                    onChange={() => setRating(num)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Your Feedback
              </label>
              <textarea
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like or dislike about this product? How is the quality..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 font-medium resize-none transition"
              />
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement)?.close()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                <Send size={12} />
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </dialog>

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
          
          <button
            type="button"
            onClick={() => setActiveTab("review")}
            className={`w-full flex items-center justify-between p-3 text-sm font-semibold rounded-xl transition ${activeTab === "review" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <span className="inline-flex items-center gap-2.5"><Star size={16} /> My Reviews</span>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold font-mono px-2 py-0.5 rounded-full">{myReviews.length}</span>
          </button>

          <Link
            href="/cart"
            className="w-full flex items-center justify-between p-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <span className="inline-flex items-center gap-2.5"><ShoppingBag size={16} /> View Shopping Cart</span>
            <span className="bg-indigo-600 text-white text-xs font-bold font-mono px-2 py-0.5 rounded-full">{cartLength}</span>
          </Link>

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

        <div className="lg:col-span-8 space-y-6">
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

                        <div className="p-4 border-b border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {order.Orderitems?.map((item, idx) => (
                            <div key={item.productId + idx} className="flex items-center justify-between gap-3 bg-slate-40/50 p-3 rounded-xl border border-slate-100">
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

          {activeTab === "review" && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">My Testimonials</h3>
                <p className="text-xs text-slate-400">Manage and preview all product appraisals submitted by you</p>
              </div>

              {myReviews.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium">
                  No review tokens registered in your timeline ledger.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myReviews.map((rev) => {
                    const reviewDate = rev.createdAt 
                      ? new Date(rev.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                      : "Recent";

                    return (
                      <div 
                        key={rev._id} 
                        className="bg-white border border-slate-100 rounded-xl p-4 shadow-2xs hover:border-slate-200 transition flex flex-col justify-between group relative"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  size={13}
                                  className={`${
                                    starIdx < rev.rating 
                                      ? "text-amber-400 fill-amber-400" 
                                      : "text-slate-200"
                                  }`}
                                />
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev._id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-100 hover:border-rose-100 transition sm:opacity-0 group-hover:opacity-100"
                              title="Delete review"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-medium pl-1 border-l-2 border-indigo-500/20">
                            "{rev.comment}"
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-mono font-semibold">
                          <span className="inline-flex items-center gap-1"><Calendar size={11} /> {reviewDate}</span>
                          <Link href={`/products/${rev.productId}`} >PID: #{rev.productId?.slice(-5).toUpperCase() || "N/A"}</Link>
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