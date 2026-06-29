"use client"
import { envFile } from "@/config/env";
import { ICartItem } from "@/interfaces/cart.interface";
import { useLayoutContext } from "@/utils/useLayoutContext";
import axios from "axios";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CartList = ({item,cartItems,setCartItems}:{item:ICartItem , cartItems:ICartItem[],setCartItems:React.Dispatch<React.SetStateAction<ICartItem[]>>})=>{
const [quantity , setQuantity] = useState<number>(item.quantity)
const {cartLength , setCartLength} = useLayoutContext()
const handleQuantityChange = async (id: string, type: "inc" | "dec") => {
  if (type === "inc" && quantity >= 50) return;
  if (type === "dec" && quantity <= 1) return;

  const newQuantity = type === "inc" ? quantity + 1 : quantity - 1;
  setQuantity(newQuantity);
  try {
    const updatedResponse = await axios.patch(
      `${envFile.BACKEND_URL}/carts/re-quantity/${id}`,
      { quantity: newQuantity }, 
      { withCredentials: true }  
    );
    toast.success("Quantity Updated")
    window.location.reload()
  } catch (error) {
    console.error("Failed to update quantity:", error);
    setQuantity(quantity); 
  }
};

  const handleRemoveItem = async(id: string) => {
    const deletedResponse = await axios.delete(`${envFile.BACKEND_URL}/carts/delete-cart/${id}`, { withCredentials: true });
   console.log(deletedResponse)
    if(deletedResponse.data.success){
      toast.success("Cart Deleted")
      setCartLength(cartLength -1);
     
      setCartItems(cartItems.filter(item => item._id !== id))
    }else{
      toast.error("Failed to Delete Cart")
    }
  };
    return(
        <div 
            key={item._id} 
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 transition hover:border-slate-200/80"
          >
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 p-2 flex items-center justify-center">
              <img 
                src={item.images[0]} 
                alt={item.productName} 
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* প্রোডাক্ট মেটা */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight truncate">
                {item.productName}
              </h3>
              
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black text-slate-900">
                  ${(item.productPrice * quantity).toFixed(1)}
                </span>
                {item.quantity > 1 && (
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    (${item.productPrice.toFixed(1)} × {quantity})
                  </span>
                )}
              </div>

       
              <div className="flex items-center bg-slate-50 border border-slate-200/60 rounded-lg p-0.5 w-fit">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item._id, "dec")}
                  disabled={item.quantity <= 1}
                  className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md disabled:opacity-30 transition"
                >
                  <Minus size={12} className="stroke-[2.5]" />
                </button>
                <span className="w-8 text-center text-xs font-bold font-mono text-slate-800 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item._id, "inc")}
                  className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md disabled:opacity-30 transition"
                >
                  <Plus size={12} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* ডিলিট বাটন */}
            <button
              type="button"
              onClick={() => handleRemoveItem(item._id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
    )
}


export default CartList;