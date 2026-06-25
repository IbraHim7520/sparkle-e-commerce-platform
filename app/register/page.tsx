"use client"

import { IUserRegister } from "@/interfaces/auth.interface";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import signup_image from "@/assets/signup.jpg"
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [errorMessage, setError] = useState("");
    const { register, reset, handleSubmit } = useForm<IUserRegister>()
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IUserRegister> = (data) => {
        setLoading(true)
        if (data.password !== data.confirmPassword) {
            setError("Password didnt matched!");
            setLoading(false);
            return;
        }

        const response = authClient.signUp.email({
            email: data.email,
            name: data.username,
            password: data.password,

        })
        response.then(() => {
            toast.success("User Registered Successfully");
            router.push("/")
            setLoading(false);
            reset();
        }).catch((error: any) => {
            toast.error(`Error: ${error.message}`)
            setLoading(false);
           
        })
    }
    useEffect(() => {
        if (!errorMessage) return;

        const timer = setTimeout(() => {
            setError("");
        }, 1500);

        return () => clearTimeout(timer);
    }, [errorMessage]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Toaster />
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Left Side Image */}
                <div className="hidden md:flex items-center justify-center  p-2">
                    <Image
                        src={signup_image}
                        quality={100}
                        priority
                        width={500}
                        height={500}
                        alt="Register Illustration"
                        className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl max-w-full"
                    />
                </div>

                {/* Right Side Form */}
                <div className="p-5 md:p-10">

                    {errorMessage && (
                        <div className="w-full p-3 mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm flex items-start gap-2">

                            {/* Icon */}
                            <span className="text-red-500 mt-0.5">⚠️</span>

                            {/* Message */}
                            <span className="font-medium">{errorMessage}</span>
                        </div>
                    )}


                    <h1 className="text-2xl font-bold text-indigo-600">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Sign up to get started
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                required
                                {...register("username")}
                                placeholder="John Doe"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                required
                                {...register("email")}
                                placeholder="you@example.com"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                required
                                {...register("password")}
                                placeholder="••••••••"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                required
                                {...register("confirmPassword")}
                                placeholder="••••••••"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition"
                        >
                            {loading ? "Loading..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-500 hover:underline">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}