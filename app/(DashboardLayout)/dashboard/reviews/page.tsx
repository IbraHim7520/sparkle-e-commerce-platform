import { cookies } from "next/headers";
import { envFile } from "@/config/env";
import { MessageSquare } from "lucide-react";
import AdminReviewList from "@/components/Lists-Cards/AdminReviewList";

export default async function ReviewPage() {
  const cookieData = await cookies();
  let reviews = [];

  try {
    const reviewResponse = await fetch(`${envFile.BACKEND_URL}/reviews/all-reviews`, {
      method: "GET",
      headers: {
        "Cookie": cookieData.toString(),
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });
    const reviewData = await reviewResponse.json();
    reviews = reviewData.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50/50 min-h-screen">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl flex items-center gap-2">
            User Feedback & Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor product quality scores, review customer testimonies, and moderate response catalogs.
          </p>
        </div>
      </div>

      {reviews.length > 0 ? (
        <AdminReviewList initialReviews={reviews} />
      ) : (
        /* এম্পটি স্টেট */
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
          <div className="text-center py-20 text-slate-400 text-xs font-medium space-y-3">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <MessageSquare size={22} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1 px-4">
              <p className="text-sm font-bold text-slate-700 tracking-tight">No Reviews Found</p>
              <p className="text-slate-400 max-w-xs mx-auto text-[11px] leading-relaxed">
                There are currently no product evaluations or star ratings registered in your backend pool.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}