import { IGetAllProductsData } from "@/interfaces/products.interface";
import { ShoppingBag } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";

const ProductCard = ({ p }: { p: IGetAllProductsData }) => {
    const router = useRouter()
    const handleCardClick = (productId:string)=>{
        router.push(`products/${productId}`)
    }
    return (
        <div
        onClick={()=>handleCardClick(p._id)}
            key={p._id}
            className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition"
        >
            <div className="relative h-64 bg-slate-100">
                <Image
                    src={p.images[0]}
                    alt={p.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                />

                <p className="absolute text-xs font-medium top-3 right-3  bg-primary-content px-2 rounded-sm shadow-sm hover:text-rose-500">
                    -{p.discount}% Off
                </p>
            </div>

            <div className="p-4">
                <h3 className="text-sm font-medium">{p.productName}</h3>

                <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-slate-900">
                        {p.productPrice}
                    </span>

                    <button className="flex items-center gap-1 text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600">
                        <ShoppingBag className="w-3 h-3" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;