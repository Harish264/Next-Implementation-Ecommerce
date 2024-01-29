"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { AiOutlineUser } from "react-icons/ai";
import NavCart from "@/components/NavCart";
import { useSelector } from "react-redux";
import { authState } from "@/redux/slices/authSlice";
import { getUserData } from "@/helpers/authHelper";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const categories = ["MEN", "WOMEN", "ELECTRONICS", "JEWELERY"];
  const [user, setUser] = useState("");
  const { isAuth } = useSelector(authState);
  const pathName = usePathname();
  if (isAuth) {
    getUserData().then((res) => {
      const userEmail = res.data.data.email;
      const emailBeforeAt = userEmail.substring(0, userEmail.indexOf("@"));
      setUser(emailBeforeAt);
    });
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4 justify-between">
          <div className="flex items-baseline">
            <Logo />
            {categories.map((category) => {
              const isActive = pathName.startsWith(
                `/products/${category.toLowerCase()}`
              );
              return (
                <Link
                  key={category}
                  href="/products/[category]"
                  as={`/products/${category.toLowerCase()}`}
                  className={
                    isActive
                      ? "text-bold-700 text-red px-3 py-2 hover:bg-gray-700"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  {category}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            {isAuth ? (
              // Display user name when authenticated
              <div className="headerDiv flex align-center text-white">
                <AiOutlineUser className="text-2xl" />
                <p className="text-sm font-semibold">{user}</p>
              </div>
            ) : (
              // Display login/register when not authenticated
              <Link href={"/login"}>
                <div className="headerDiv cursor-pointer flex align-center text-white border-[1] border-white rounder-full mr-2">
                  <AiOutlineUser className="text-2xl" />
                  <p className="text-sm font-semibold">Login/Register</p>
                </div>
              </Link>
            )}
            <NavCart />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
