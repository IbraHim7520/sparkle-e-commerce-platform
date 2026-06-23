"use client"

import { IUserLogin } from "@/interfaces/auth.interface";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const {register , handleSubmit , reset} = useForm<IUserLogin>()
  const [loading , setLoading ]= useState(false);


  const onSubmit:SubmitHandler<IUserLogin> = (data)=>{
      setLoading(true);
      const sigininResponse = authClient.signIn.email({
        email:data.email,
        password:data.password
      });
      sigininResponse.then(()=>{
        setLoading(false);
        toast.success("User Logined Successfully")
        router.push("/")
        reset();
      }).catch((error:any)=>{
        setLoading(false);
        toast.error(error.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        >
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
            required
            {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
            required
            {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}