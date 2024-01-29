"use client";
import {
  getPDPproduct,
  postAddtoCart,
  setAddToCart,
} from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PDPpage = ({ params }) => {
  const [pdpData, setPdpData] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    const payload = params.productall[1];
    dispatch(getPDPproduct(payload))
      .unwrap()
      .then((res) => {
        setPdpData(res);
        console.log("RES",res)
      });
  }, []);
  const handleAddToCart = () => {
    dispatch(setAddToCart({ pdpData: pdpData, quantity: 1 }));
    setIsAddedToCart(true);
     // Update local storage
    //  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    //  const newItem = { pdpData, quantity: 1 };
    //  const updatedCart = [...cartItems, newItem];
    //  localStorage.setItem("cart", JSON.stringify(updatedCart));
    // const payload ={
    //   productId:pdpData.id,
    //   quantity:1
    // }
    // dispatch(postAddtoCart(payload))
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full"
                src={pdpData.image}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {pdpData.title}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  $
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {pdpData.price}
                </span>
              </div>
            </div>
            {pdpData &&
            (pdpData.category?.includes("men") ||
              pdpData.category?.includes("women")) ? (
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
            ) : null}
            {pdpData &&
            (pdpData.category?.includes("men") ||
              pdpData.category?.includes("women")) ? (
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
            ) : null}
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {pdpData.description}
              </p>
            </div>
            <div className="flex -mx-2 mb-4 mt-5">
              <div className="w-1/2 px-2">
              {isAddedToCart ? (
          <button
          onClick={() => router.push('/cart')}
            className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            Go to Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            Add to Cart
          </button>
        )}
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDPpage;
