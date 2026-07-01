"use client";

import { useState } from "react";
import { Search, Shield, User, Mail, Calendar, Key } from "lucide-react";
import { IGetAllUsers } from "@/interfaces/auth.interface";


interface AdminCustomersListProps {
  initialUsers: IGetAllUsers[];
}

export default function AdminUserList({ initialUsers }: AdminCustomersListProps) {
  const [users] = useState<IGetAllUsers[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
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
            placeholder="Search accounts by legal name, registration email, or unique token ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-indigo-500 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Access Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-40 px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Identities</option>
            <option value="admin">Admin Nodes</option>
            <option value="user">Standard Users</option>
          </select>
        </div>
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs font-medium">
            No matching user identities found aligning with your active filter targets.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Identity Information</th>
                  <th className="p-4">Contact Matrix</th>
                  <th className="p-4">System Rights (Role)</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-right">Account Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {filteredUsers.map((user) => {
                  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });

                  const isAdmin = user.role.toLowerCase() === "admin";

                  return (
                    <tr key={user._id} className="hover:bg-slate-50/30 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                            isAdmin 
                              ? "bg-indigo-50 text-indigo-600 border-indigo-100" 
                              : "bg-slate-50 text-slate-500 border-slate-200/60"
                          }`}>
                            {isAdmin ? <Shield size={16} /> : <User size={16} />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 tracking-tight capitalize">{user.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">UID: {user._id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Mail size={13} className="text-slate-400" />
                          {user.email}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold tracking-tight ${
                          isAdmin 
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-100" 
                            : "bg-slate-100 text-slate-600 border border-slate-200/50"
                        }`}>
                          {isAdmin ? "Administrator" : "Standard Client"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                          <Calendar size={13} className="text-slate-400" />
                          {joinDate}
                        </span>
                      </td>
                      <td className="p-4 text-right align-middle">
                        <span className="text-[11px] text-slate-400 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                          #{user._id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
}