"use client";

import { envFile } from "@/config/env";
import { CategoryStatus, IGetProductCategory, IUploadCategory } from "@/interfaces/category.interface";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";



export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<IGetProductCategory[]>([])
  const {handleSubmit , reset , register} = useForm<IUploadCategory>()


  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`${envFile.BACKEND_URL}/categories/all-cats`, {
        signal: controller.signal,
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        } else {
          console.log(error);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleAddCategory = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal()
  };


const onSubmit: SubmitHandler<IUploadCategory> = async (data) => {
  try {
    const response = await axios.post(
      `${envFile.BACKEND_URL}/categories/new-category`,
      data
    );

    if (response.data.success) {
      toast.success(response.data.message);
      reset();
      return;
    }

    toast.error(response.data.message || "Something went wrong");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};


const deleteCategory = async(catId:string)=>{
    
    if(!confirm("Are you sure you want to delete this category?")) return;
    
    try {
        const response = await axios.delete(`${envFile.BACKEND_URL}/categories/delete-categories/${catId}`);
        if(response.data.success){
            toast.success(response.data.message);
            setCategories(categories.filter((cat) => cat._id !== catId));
            return;
        }
        toast.error(response.data.message || "Something went wrong");
    } catch (error: any) {
        toast.error(
            error.response?.data?.message || "Something went wrong"
        );
    }
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 ">
      <Toaster />
      <div className="w-full  mx-auto space-y-6">
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Add Category
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Add a new category to your store
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 w-full">
              <input {...register("title")} type="text" placeholder="Category Name" className="w-full mt-3 input py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
              <select {...register("status")} className="select select-success w-full">
                <option value={CategoryStatus.ACTIVE}>Active</option>
                <option value={CategoryStatus.IN_ACTIVE}>In Active</option>
              </select>
              <button type="submit" className="btn btn-primary w-full">Add Category</button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
          {/* <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form> */}
        </dialog>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 ">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Categories Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, edit, and organize your store's product classifications.
            </p>
          </div>

          {/* Top Right Action Button */}
          <button
            onClick={handleAddCategory}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition self-start sm:self-auto group"
          >
            {/* Plus Icon SVG */}
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Category
          </button>
        </div>

        {/* Categories List Container */}
        <div className="bg-white rounded-2xl  border border-slate-100 overflow-x-auto">

          {/* List Headers (Visible on desktop screens) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/70 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <div className="col-span-4">Category Name</div>
            <div className="col-span-3">ID</div>
            <div className="col-span-2 text-center">Created</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* List Rows */}
          <div className="divide-y divide-slate-100 ">
            {categories.map((category) => (
              <div
                key={category._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-slate-50/40 transition duration-150"
              >
                {/* Name & Title */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 shrink-0">
                    {category.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {category.title}
                    </h3>
                    <span className="md:hidden text-xs text-slate-400 block mt-0.5">
                      ID: /{category._id}
                    </span>
                  </div>
                </div>

                {/* Slug (Hidden on mobile context, fallback string embedded above) */}
                <div className="hidden md:block col-span-3 text-sm text-slate-600 font-mono">
                  /{category._id}
                </div>

                {/* Product Count Metric */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-1.5 md:gap-0 text-sm text-slate-600">
                  <span className="md:hidden text-xs text-slate-400 font-medium">Items: </span>
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-700">
                    {category?.createdAt.split("T")[0]}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-1.5 md:gap-0">
                  <span className="md:hidden text-xs text-slate-400 font-medium">Status: </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${category.status === CategoryStatus.ACTIVE
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                        : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${category.status === CategoryStatus.ACTIVE ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                    />
                    {category.status}
                  </span>
                </div>

                {/* Quick Row Actions */}
                <div className=" w-full flex items-center justify-end">
                  <button onClick={()=>deleteCategory(category._id)} className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition px-2 py-1 hover:bg-rose-50 rounded-md">
                    <Trash2 size={15} className="hover:text-indigo-500 hover:cursor-pointer"/>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}