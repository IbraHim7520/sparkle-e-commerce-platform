"use client";

import { envFile } from "@/config/env";
import { IGetProductCategory } from "@/interfaces/category.interface";
import { IUploadProductData, ProductStatus } from "@/interfaces/products.interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function ProductUploadForm() {
  const { register, handleSubmit, reset } = useForm<IUploadProductData>();
  const [addCount, setAddCount] = useState(1);
  const [category, setCategoryData] = useState<IGetProductCategory[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Track actual selected files for each dynamic upload slot
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);

const uploadImageToCloudinary = async (imgFile: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", imgFile);
  formData.append("upload_preset", envFile.CLOUDINARY_PRESET as string);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${envFile.CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Cloudinary Upload Failed");
  }

  return data.secure_url;
};

  useEffect(() => {
    axios.get(envFile.BACKEND_URL + "/categories/all-cats").then((response) => {
      setCategoryData(response.data.data || []);
    });

    return () => {
      console.log("cleanup");
    };
  }, []);

  // Sync image file slots when card counts change
  useEffect(() => {
    setImageFiles((prev) => {
      if (prev.length < addCount) {
        return [...prev, ...Array(addCount - prev.length).fill(null)];
      }
      return prev.slice(0, addCount);
    });
  }, [addCount]);

  const handleFileChange = (index: number, file: File | null) => {
    setImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const onSubmit: SubmitHandler<IUploadProductData> = async (data: IUploadProductData) => {
    const validFiles = imageFiles.filter((file): file is File => file !== null);
    if (validFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);

    if (data?.tags && !data.tags.includes(",") && data.tags.includes(" ")) {
      toast.error("Tags must be separated by commas");
      setLoading(false);
      return;
    }

    const parseCommaSeparated = (val: unknown) => {
      if (typeof val === "string" && val.trim() !== "") {
        return val.split(",").map((item: string) => item.trim());
      }
      return [];
    };

    const payload = {
      productName: data.productName,
      productPrice: data.productPrice,
      productCategoryName: data.productCategoryName,
      stock: data.stock,
      discount: data.discount,
      productStatus: data.productStatus,
      productDescription: data.productDescription,
      productAdditionalInfo: data.productAdditionalInfo,
      brandName: data.brandName,
      tags: parseCommaSeparated(data.tags),
      productColors: parseCommaSeparated(data.productColors),
      productSizes: parseCommaSeparated(data.productSizes),
      images: [] as string[],
    };

    try {
      const imageUrls = await Promise.all(
    validFiles.map(uploadImageToCloudinary)
);

      payload.images = imageUrls;
      console.log(payload)

      const productUploadResponse = await axios.post(
        `${envFile.BACKEND_URL}/products/add-products`,
        payload,
        { withCredentials: true }
      );

      if (productUploadResponse.data?.data?.acknowledged || productUploadResponse.status === 200) {
        toast.success("Product added successfully");
        reset();
        setImageFiles([]);
        setAddCount(1);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading product details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen flex justify-center items-center">
      <div className="w-full overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-10">
          <Toaster />
          
          {/* Section 1: Product Details */}
          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">Product Details</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
                  Product Name
                </label>
                <input
                  {...register("productName")}
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label htmlFor="brandName" className="block mb-2 text-sm font-medium text-slate-700">
                  Brand Name (Optional)
                </label>
                <input
                  {...register("brandName")}
                  type="text"
                  id="brandName"
                  placeholder="Enter brand name"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  {...register("productPrice", { valueAsNumber: true })}
                  id="price"
                  min="0"
                  step="1"
                  placeholder="0.00"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label htmlFor="productCategoryId" className="block mb-2 text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  {...register("productCategoryName")}
                  id="productCategoryId"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 bg-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                >
                  <option value="">Select a category</option>
                  {category.map((cat, idx) => (
                    <option key={idx} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-slate-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  {...register("stock", { valueAsNumber: true })}
                  min="0"
                  placeholder="Enter stock amount"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label htmlFor="discount" className="block mb-2 text-sm font-medium text-slate-700">
                  Discount (%) (Optional)
                </label>
                <input
                  type="number"
                  {...register("discount", { valueAsNumber: true })}
                  id="discount"
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-slate-700">Product Status</label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    {...register("productStatus")}
                    value={ProductStatus.IN_STOCK}
                    defaultChecked
                    className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition">In Stock</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    {...register("productStatus")}
                    value={ProductStatus.UPCOMING}
                    className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition">Upcoming</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Description */}
          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">Specifications & Description</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="size" className="block mb-2 text-sm font-medium text-slate-700">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  {...register("productSizes")}
                  placeholder="e.g. XL, 42, Large"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label htmlFor="color" className="block mb-2 text-sm font-medium text-slate-700">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("productColors")}
                  placeholder="e.g. Black, Red, Indigo"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="productDescription"
                {...register("productDescription")}
                rows={4}
                placeholder="Write a compelling description for your product..."
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[100px]"
                required
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium text-slate-700">
                Additional Info <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="additionalInfo"
                {...register("productAdditionalInfo")}
                rows={3}
                placeholder="Warranty details, materials, care instructions..."
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[80px]"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block mb-2 text-sm font-medium text-slate-700">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                {...register("tags")}
                placeholder="e.g. Casual, Summer, New"
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Section 3: Imagery */}
          <div className="space-y-6">
            <div className="border-b border-indigo-100 pb-3">
              <h2 className="text-xl font-semibold text-indigo-950">Product Imagery</h2>
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-slate-700">Upload Product Images</label>

              <div className="flex flex-wrap gap-4 justify-items-center items-center justify-start">
                {Array.from({ length: addCount }).map((_, i) => (
                  <div key={i}>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square border-2 border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/60 hover:border-indigo-400 rounded-xl p-3 transition flex flex-col items-center text-center justify-center cursor-pointer group">
                      <input
                        type="file"
                        id={`image-${i}`}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange(i, file);
                        }}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (addCount > 1) {
                            setAddCount(addCount - 1);
                            setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
                          }
                        }}
                        className="absolute top-1.5 right-1.5 z-20 p-1 bg-white hover:bg-rose-50 border border-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition shadow-sm"
                        title="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 mb-1.5 group-hover:scale-110 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>

                      <p className="text-[11px] sm:text-xs font-semibold text-indigo-600 underline truncate max-w-full px-1">
                        {imageFiles[i] ? imageFiles[i]?.name : "Upload Image"}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 hidden sm:block">Up to 5MB</p>
                    </div>
                  </div>
                ))}

                {/* "Add More" Trigger Card */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square border-2 border-dashed border-indigo-100 bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-300 rounded-xl p-3 transition flex flex-col items-center text-center justify-center cursor-pointer group">
                  <button
                    type="button"
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    onClick={() => setAddCount(addCount + 1)}
                  />
                  <svg className="w-6 h-6 sm:w-7 text-indigo-400 mb-1.5 group-hover:rotate-90 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600 group-hover:text-indigo-600 transition">Add More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                setImageFiles([]);
                setAddCount(1);
              }}
              className="w-full sm:w-auto order-2 sm:order-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto order-1 sm:order-2 px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/20 transition duration-150 text-center flex justify-center items-center"
            >
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span> : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}