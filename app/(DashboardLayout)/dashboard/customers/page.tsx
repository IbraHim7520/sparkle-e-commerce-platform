import { cookies } from "next/headers";
import { envFile } from "@/config/env";
import { Users } from "lucide-react";
import AdminUserList from "@/components/Lists-Cards/AdminUserList";

export default async function CustomersPage() {
  const cookistore = await cookies();
  let users = [];

  try {
    const userResponse = await fetch(`${envFile.BACKEND_URL}/users/all-users`, {
      method: "GET",
      headers: {
        Cookie: cookistore.toString(),
      },
      cache: "no-store"
    });
    const jsonRes = await userResponse.json();
    users = jsonRes.data || [];
  } catch (error) {
    console.error("Error fetching users directory:", error);
  }

  return (
    <div className="w-full max-w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Customer Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage corporate user registrations, monitor role hierarchy nodes, and audit security credentials.
          </p>
        </div>
      </div>
      {users.length > 0 ? (
        <AdminUserList initialUsers={users} />
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
          <div className="text-center py-20 text-slate-400 text-xs font-medium space-y-3">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Users size={22} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1 px-4">
              <p className="text-sm font-bold text-slate-700 tracking-tight">No Users Found</p>
              <p className="text-slate-400 max-w-xs mx-auto text-[11px] leading-relaxed">
                There are currently no registered users or consumers found inside the authentication database.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}