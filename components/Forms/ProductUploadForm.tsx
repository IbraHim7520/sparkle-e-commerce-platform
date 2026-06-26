"use client";

import { envFile } from "@/config/env";
import { IGetProductCategory } from "@/interfaces/category.interface";
import { IUploadProductData } from "@/interfaces/products.interface";
import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function ProductUploadForm() {

  const { register, handleSubmit, reset } = useForm<IUploadProductData>()
  const [addCount, setAddCount] = useState(1);
  const [category , setCategoryData] = useState<IGetProductCategory[]>([]);
  const [loading , setLoading] = useState(false)

  const uploadImageToCloudinary = async(imgFile:File)=>{
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", envFile.CLOUDINARY_PRESET as string);

    const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      envFile.CLOUDINARY_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log(data)
  return data.secure_url;
  }

  useEffect(()=>{
      axios.get(envFile.BACKEND_URL+"/categories/all-cats").then((response)=>{
        setCategoryData(response.data.data || [])
      })

      return ()=>{
        console.log("cleanup")
      }
  },[])

  const onSubmit: SubmitHandler<IUploadProductData> = async(data:any) => {
    setLoading(true);
    if(!data?.tags.includes(",") && data?.tags.includes(" ")){
      toast.error("Tags must be separated by commas");
      return;
    }
    data.productCategoryName = category.find((cat)=>cat._id === data.productCategoryId)?.title || ""
      const payload = {
    ...data,
    tags:
      typeof data.tags === "string"
        ? data.tags.split(",").map((tag:string) => tag.trim())
        : [],
  };

  const imageFiles = Array.from(data.images as FileList);

  const imageUrls = await Promise.all(
    imageFiles.map((file)=> uploadImageToCloudinary(file))
  )

  payload.images = imageUrls
  
  const productUploadResponse = await axios.post(`${envFile.BACKEND_URL}/products/add-products`, payload)
  
  if(productUploadResponse.data.data.acknowledged){
    toast.success("Product added successfully")
    reset()
    setLoading(false)
  }
  else{
    toast.error("Failed to add product")
    setLoading(false)
  }
  setLoading(false)
}

  

  return (
    <div className="w-full bg-slate-50 min-h-screen  flex justify-center items-center">
      <div className="w-full   overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-10">
          {/* Section 1: Product Details */}
          <Toaster />
          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">
                Product Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Product Name
                </label>
                <input
                {...register("productName")}
                  type="text"
                  id="name"
                  name="productName"
                  placeholder="Enter product name"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  {...register("productPrice", {valueAsNumber:true})}
                  id="price"
                  name="productPrice"
                  min="0"
                  step="1"
                  placeholder="0.00"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="productCategoryId"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  {...register("productCategoryId")}
                  id="productCategoryId"
                  name="productCategoryId"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 bg-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                >
                  {
                    category.map((cat , idx)=>{
                      return <option key={idx} value={cat._id}>{cat.title}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  {...register("stock", {valueAsNumber:true})}
                  name="stock"
                  min="0"
                  placeholder="Enter stock amount"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="discount"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Discount (%) (Optional)
                </label>
                <input
                  type="number"
                  {...register("discount", {valueAsNumber:true})}
                  id="discount"
                  name="discount"
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-slate-700">
                Product Status
              </label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    {...register("productStatus")}
                    value="IN_STOCK"
                    name="productStatus"
                    defaultChecked
                    className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition">
                    In Stock
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    {...register("productStatus")}
                    value="UPCOMING"
                    name="productStatus"
                    className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition">
                    Upcoming
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Description */}
          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">
                Specifications & Description
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  {...register("productSize")}
                  name="productSize"
                  placeholder="e.g. XL, 42, Large"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("productColor")}
                  name="productColor"
                  placeholder="e.g. Black, Red, Indigo"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="productDescription"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="productDescription"
                {...register("productDescription")}
                name="productDescription"
                rows={4}
                placeholder="Write a compelling description for your product..."
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[100px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="additionalInfo"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Additional Info <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="additionalInfo"
                {...register("productAdditionalInfo")}
                name="productAdditionalInfo"
                rows={3}
                placeholder="Warranty details, materials, care instructions..."
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[80px]"
              />
            </div>


          <div>
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  {...register("tags")}
                  name="tags"
                  placeholder="e.g. Black, Red, Indigo"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">
                Product Imagery
              </h2>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-3 text-sm font-medium text-slate-700"
              >
                Upload Product Images
              </label>

              {/* Responsive Flex Wrapper */}
              <div className="flex flex-wrap gap-4 justify-items-center items-center justify-start">


                {
                  Array.from({ length: addCount }).map((_, i) => {
                    return (
                      <div key={i}>


                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square border-2 border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/60 hover:border-indigo-400 rounded-xl p-3 transition flex flex-col items-center text-center justify-center cursor-pointer group">

                          {/* 1. Hidden file Input element */}
                          <input
                            type="file"
                            {...register("images")}
                            id={`image-${i}`}
                            name="images"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />

                          {/* 2. TOP RIGHT CANCEL BUTTON */}
                          <button
                            type="button"
                            onClick={()=>setAddCount(addCount - 1)}
                            className="absolute top-1.5 right-1.5 z-20 p-1 bg-white hover:bg-rose-50 border border-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition shadow-sm"
                            title="Remove image"
                          >
                            {/* Clean Close X Vector Icon */}
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          {/* 3. Core Image Upload Indicators */}
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 mb-1.5 group-hover:scale-110 transition duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>

                          <p className="text-[11px] sm:text-xs font-semibold text-indigo-600 underline">
                            Upload Image
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                            Up to 5MB
                          </p>
                        </div>
                      </div>
                    )
                  })
                }

                {/* "Add More" Trigger Card */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square border-2 border-dashed border-indigo-100 bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-300 rounded-xl p-3 transition flex flex-col items-center text-center justify-center cursor-pointer group">
                  <button
                    type="button"
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    onClick={() => setAddCount(addCount + 1)}
                  />

                  {/* Plus Sign Icon */}
                  <svg
                    className="w-6 h-6 sm:w-7  text-indigo-400 mb-1.5 group-hover:rotate-90 transition duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                  <span className="text-[11px] sm:text-xs font-medium text-slate-600 group-hover:text-indigo-600 transition">
                    Add More
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              className="w-full sm:w-auto order-2 sm:order-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto order-1 sm:order-2 px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/20 transition duration-150 text-center"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}