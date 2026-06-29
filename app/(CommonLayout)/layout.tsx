"use client"
import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import { envFile } from "@/config/env";
import { useAuth } from "@/utils/useGetUser";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export type LayoutContextType = {
  user: Record<string, any> | null;
  loading: boolean;
  setUser: (user: Record<string, any> | null) => void;
  cartLength: number,
  setCartLength: Dispatch<SetStateAction<number>>
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, setUser } = useAuth();
  const [cartLength, setCartLength] = useState(0);


    useEffect(() => {
      const getCartCount = async () => {
        const res = await axios.get(`${envFile.BACKEND_URL}/carts/cart-length`, {
          withCredentials: true
        });
        setCartLength(res.data.data);
      }
      getCartCount()
    }, [user])
  return (
    
    <LayoutContext.Provider value={{
      user,
      loading,
      setUser,
      cartLength,
      setCartLength
    }}>
      <Navbar />
      {children}
      <Footer />
    </LayoutContext.Provider>
    
  );
}