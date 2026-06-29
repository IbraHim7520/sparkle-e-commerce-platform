"use client";

import { LayoutContext } from "@/app/(CommonLayout)/layout";
import { useContext } from "react";

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayoutContext must be used inside CommonLayout");
  }

  return context;
};