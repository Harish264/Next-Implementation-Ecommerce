"use client";

import { selectProductsState } from "@/redux/slices/productSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";

const NavCart = () => {
  const { cartProduct } = useSelector(selectProductsState);
  return (
    <Link href={"/cart"}>
      <div className=" text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5  duration-200 relative">
        <IoMdCart className="text-xl" />
        <span className="bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black">
          {cartProduct ? cartProduct?.length : 0}
        </span>
      </div>
    </Link>
  );
};

export default NavCart;
