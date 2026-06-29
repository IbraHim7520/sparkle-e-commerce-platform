"use client";

import { useEffect, useState } from "react";
import {
    Calendar,
    Tag,
    Layers,
    Package,
    ArrowLeft,
    Info,
    FileText,
    CheckCircle2,
    AlertCircle,
    ShoppingCart,
    ShoppingBag,
    Plus,
    Minus
} from "lucide-react";

import { IGetAllProductsData } from "@/interfaces/products.interface";
import axios from "axios";
import { envFile } from "@/config/env";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/utils/useGetUser";
import toast, { Toaster } from "react-hot-toast";
import { useLayoutContext } from "@/utils/useLayoutContext";

export enum ProductStatus {
    IN_STOCK = "IN_STOCK",
    UPCOMING = "UPCOMING",
    OUT_OF_STOCK = "OUT_OF_STOCK",
}

const DynamicProductDetailsPage = () => {
    const [quantity, setQuantity] = useState<number>(1);

    const params = useParams();
    const router = useRouter();
    const productId = params?.productId;
    const {user , setCartLength, cartLength} = useLayoutContext()
    const [product, setProduct] = useState<IGetAllProductsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeImage, setActiveImage] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"description" | "additional">("description");

    useEffect(() => {
        const controller = new AbortController();
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${envFile.BACKEND_URL}/products/get-product/${productId}`,
                    { signal: controller.signal }
                );
                const productData = response.data.data;

                setProduct(productData);
                if (productData?.images && productData.images.length > 0) {
                    setActiveImage(productData.images[0]);
                }
            } catch (err: any) {
                if (axios.isCancel(err)) {
                    console.log("Fetch aborted successfully");
                } else {
                    console.error("Error fetching product:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
        return () => {
            controller.abort();
        };
    }, [productId]);

    const hasDiscount = product?.discount && product?.discount > 0;
    const UndiscountedPrice = hasDiscount && product
        ? product.productPrice + (product.productPrice * (product.discount || 0)) / 100
        : product?.productPrice;


    const handleQuantityChange = (type: "inc" | "dec") => {
        if (type === "inc") {

            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        }
    }

    const handleAddtoCart = async (productId: string , quality:number) => {
        if (!user) {
            router.push("/login");
            return;
        }
        
        const response = await axios.post(`${envFile.BACKEND_URL}/carts/add-cart`, {
            userId: user.id,
            productId: productId,
            quantity: quality
        })
        if(response.data.data.insertedId){
            toast.success("Product Added to Cart")
            setCartLength(cartLength + 1)
        }else{
            toast.error("Failed to Add Product to Cart")
        }
    }

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center text-slate-500 font-medium">
                <div className="animate-pulse flex flex-col items-center gap-3">
                    <Package size={40} className="text-indigo-500 animate-bounce" />
                    <span>Loading Product Details...</span>
                </div>
            </div>
        );
    }


    if (!product) {
        return (
            <div className="w-full p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <AlertCircle size={48} className="mx-auto text-rose-500" />
                <h2 className="text-lg font-bold text-slate-800">Product Not Found</h2>
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
                    <ArrowLeft size={16} /> Back to Products List
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">

        <Toaster />
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Link
                    href={"/products"}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition"
                >
                    <ArrowLeft size={16} />
                    Back to List
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">

                        <div className="aspect-square w-full rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative p-4">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={product.productName}
                                    className="w-full h-full object-contain mix-blend-multiply transition duration-300"
                                />
                            ) : (
                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                    <Package size={48} className="stroke-[1.5]" />
                                    <span className="text-sm">No Image Selected</span>
                                </div>
                            )}

                            <div className="absolute top-4 left-4">
                                {product.productStatus === ProductStatus.IN_STOCK ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                        <CheckCircle2 size={12} /> IN STOCK
                                    </span>
                                ) : product.productStatus === ProductStatus.UPCOMING ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                        <AlertCircle size={12} /> UPCOMING
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                        <AlertCircle size={12} /> OUT OF STOCK
                                    </span>
                                )}
                            </div>
                        </div>

                        {product.images && product.images.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2.5 pt-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(image)}
                                        className={`w-16 h-16 border rounded-xl overflow-hidden cursor-pointer transition p-1 bg-slate-50/50 ${activeImage === image ? "border-indigo-600 ring-2 ring-indigo-600/10" : "border-slate-200 hover:border-slate-400"
                                            }`}
                                    >
                                        <Image quality={100} width={100} priority={true} height={100} src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wider">
                            <Layers size={13} /> {product.productCategoryName}
                        </div>
                        {product.createdAt && (
                            <div className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                                <Calendar size={13} /> Added on {new Date(product.createdAt).toLocaleDateString()}
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                            {product.productName}
                        </h1>

                        <div className="flex items-baseline gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 w-fit">
                            <span className="text-2xl font-black text-slate-900">
                                ${product?.productPrice}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-sm font-semibold text-slate-400 line-through">
                                        ${UndiscountedPrice}
                                    </span>
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ইনভেন্টরি প্যারামিটারস */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-b border-slate-100 py-5">
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Stock Level</span>
                            <span className={`inline-flex items-center text-sm font-semibold font-mono ${product.stock === 0 ? "text-rose-600" : "text-slate-800"
                                }`}>
                                {product.stock} Units Available
                            </span>
                        </div>

                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Size Parameter</span>
                            <span className="inline-flex px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-md uppercase">
                                {product.productSize || "Universal"}
                            </span>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Color Swatch</span>
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-5 h-5 rounded-full border border-slate-300 shadow-sm block shrink-0"
                                    style={{ backgroundColor: product.productColor || "#ccc" }}
                                />
                                <span className="text-xs font-medium text-slate-500 font-mono">
                                    {product.productColor || "Standard"}
                                </span>
                            </div>
                        </div>
                    </div>


                    {product.tags && product.tags.length > 0 && (
                        <div className="space-y-2">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Search Tags</span>
                            <div className="flex flex-wrap gap-1.5">
                                {product.tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50/60 text-indigo-700 border border-indigo-100/50 text-xs font-medium rounded-lg">
                                        <Tag size={10} /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100">

                        {/* ১. কোয়ান্টিটি সিলেক্টর (বাগ-ফ্রি ও ইন-লাইন ফ্রেন্ডলি) */}
                        <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-1 w-fit shadow-xs">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange("dec")}
                                disabled={quantity <= 1}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent transition"
                            >
                                <Minus size={14} className="stroke-[2.5]" />
                            </button>

                            <span className="w-12 text-center text-sm font-bold font-mono text-slate-800 select-none">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() => handleQuantityChange("inc")}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition"
                            >
                                <Plus size={14} className="stroke-[2.5]" />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddtoCart(product._id, quantity)} // কোয়ান্টিটি সহ পাস করা ভালো
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm shadow-indigo-600/10 w-full sm:w-auto"
                        >
                            <ShoppingCart size={16} />
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>


            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition ${activeTab === "description"
                            ? "border-indigo-600 text-indigo-600 bg-white"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                    >
                        <FileText size={16} />
                        Description
                    </button>

                    <button
                        onClick={() => setActiveTab("additional")}
                        className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition ${activeTab === "additional"
                            ? "border-indigo-600 text-indigo-600 bg-white"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                    >
                        <Info size={16} />
                        Additional Information
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === "description" ? (
                        <div className="text-sm text-slate-600 leading-relaxed max-w-none whitespace-pre-line">
                            {product.productDescription || "No detailed description provided for this product catalogue item."}
                        </div>
                    ) : (
                        <div className="text-sm text-slate-600 leading-relaxed max-w-none whitespace-pre-line">
                            {product.productAdditionalInfo || "No extra metadata specs or supplementary logistics criteria saved for this item."}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DynamicProductDetailsPage;