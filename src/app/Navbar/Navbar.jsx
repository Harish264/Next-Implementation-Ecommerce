"use client";

import { setCategories } from "@/redux/slices/productSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = ["MEN", "WOMEN", "ELECTRONICS", "JEWELERY"];
  const handleCategoryClick = async (category) => {
    await dispatch(setCategories(category));
  };

  return (
    <nav className="bg-gray-800">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <Link
              key={category}
              href="/products/[category]"
              as={`/products/${category.toLowerCase()}`}
              onClick={() => handleCategoryClick(category)}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
