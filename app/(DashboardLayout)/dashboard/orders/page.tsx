import AdminOrdersList from "@/components/Lists-Cards/AdminOrdersList";
import { envFile } from "@/config/env";
import { cookies } from "next/headers";
import { IGetMyOrderedData } from "@/interfaces/cart.interface";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  let data: IGetMyOrderedData[] = [];

  try {
    const ordersResponse = await fetch(
      `${envFile.BACKEND_URL}/orders/all-orders`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );
    const ordersData = await ordersResponse.json();
    data = ordersData.data || [];
  } catch (error) {
    console.error("Error fetching admin orders:", error);
  }

  return (
    <div className="w-full max-w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50/50 min-h-screen">
      
  
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Admin Order Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage corporate incoming pipelines, filter invoice databases, and dispatch packages.
          </p>
        </div>
      </div>

      <AdminOrdersList orders={data} />

    </div>
  );
}