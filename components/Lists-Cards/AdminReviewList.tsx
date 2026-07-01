"use client";

import React, { useState } from "react";
import { Search, Trash2, Star, User, Calendar, MessageCircle, SlidersHorizontal } from "lucide-react";
import axios from "axios";
import { envFile } from "@/config/env";
import toast from "react-hot-toast";
import Link from "next/link";
import { IGetAllReviews } from "@/interfaces/review.interface";


interface AdminReviewListProps {
  initialReviews: IGetAllReviews[];
}

export default function AdminReviewList({ initialReviews }: AdminReviewListProps) {
  const [reviews, setReviews] = useState<IGetAllReviews[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");


  const handleDeleteReview = async (reviewId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to purge this customer review permanently?");
    if (!confirmDelete) return;

    try {

      const deleteReviewResponse = await axios.delete(`${envFile.BACKEND_URL}/reviews/review/delete/${reviewId}`, {
        withCredentials:true,
      })
     if(deleteReviewResponse.data.success){

       setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
       toast.success(`${deleteReviewResponse.data.message || "Review deleted successfully."}`)
       return
     }
    } catch (error) {
      console.error("Failed to delete review token:", error);
      alert("An error occurred while cleaning the server records.");
    }
  };

  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch =
      rev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === "All" || rev.rating === parseInt(ratingFilter);

    return matchesSearch && matchesRating;
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
            placeholder="Filter reviews by reviewer username or feedback text keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Score:</span>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full md:w-40 px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars Only</option>
            <option value="2">2 Stars Only</option>
            <option value="1">1 Star Only</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-xs font-medium">
          No matching consumer logs align with your search parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => {
            const reviewDate = rev.createdAt 
              ? new Date(rev.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
              : "Recent";

            return (
              <div 
                key={rev._id} 
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:border-slate-200 transition flex flex-col justify-between relative overflow-hidden group"
              >
                
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
                        <User size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight capitalize">
                          {rev.username}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Calendar size={11} /> {reviewDate}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev._id)}
                      className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-100/80 hover:border-rose-200 transition opacity-100 md:opacity-0 group-hover:opacity-100"
                      title="Purge Testimonial"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        size={14}
                        className={`${
                          starIdx < rev.rating 
                            ? "text-amber-400 fill-amber-400" 
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-mono font-bold text-slate-400 ml-1.5 bg-slate-50 border border-slate-100 px-1.5 py-0.2 rounded">
                      {rev.rating}.0
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium pl-1 border-l-2 border-indigo-500/30">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50/80 flex items-center justify-between text-[10px] text-slate-400 font-mono font-semibold">
                  <span>ID: #{rev._id.slice(-6).toUpperCase()}</span>
                  <span>UID: #{rev.userId.slice(-5).toUpperCase()}</span>
                </div>

                <Link href={`/products/${rev.productId}`} className="w-full mt-4 py-2.5 px-5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 hover:text-indigo-700 rounded-xl font-semibold text-sm transition">View Product</Link>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}