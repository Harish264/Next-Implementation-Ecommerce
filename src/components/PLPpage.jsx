"use client";

import { getProductList, setProducts } from "@/redux/slices/productSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PLPpage = ({ params }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList())
      .unwrap()
      .then((res) => {
        setData(res);
        dispatch(setProducts(res));
      });
  }, []);

  const filteredProducts = data?.filter((product) =>
    product.category.toLowerCase().includes(params.productall[0].toLowerCase())
  );
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {filteredProducts?.map((productData, index) => (
        <div
          key={index}
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <Link href={`/products/${params.productall[0]}/${productData.id}`}>
            <img
              src={productData.image}
              alt="product image"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                BRAND
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {productData.title}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  ${productData.price}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PLPpage;
