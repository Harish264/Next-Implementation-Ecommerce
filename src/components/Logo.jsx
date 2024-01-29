import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h6 className="text-2xl font-semibold cursor-pointer duration-200 text-white mr-3">
        Ecom Logo
      </h6>
    </Link>
  );
};

export default Logo;
