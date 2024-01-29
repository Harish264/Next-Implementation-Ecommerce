"use client";

import {
  deleteProduct,
  selectProductsState,
  setDecreaseQuantity,
  setIncreaseQuantity,
  setTotalAmount,
} from "@/redux/slices/productSlice";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export const CartItems = () => {
  const { cartProduct } = useSelector(selectProductsState);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    let amount = 0;
    cartProduct?.map((item) => {
      amount += item.price * item.quantity;
      return;
    });
    dispatch(setTotalAmount(amount));
    setTotalAmt(amount);
  }, [cartProduct]);
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartProduct &&
            cartProduct?.map((item) => (
              <div className="justify-between mb-6 rounded-lg bg-white p-7 shadow-md sm:flex sm:justify-start relative">
                <span
                  onClick={() => dispatch(deleteProduct(item?.id))}
                  className="text-lg hover:text-red-600 cursor-pointer duration-200 absolute top-3 right-3"
                >
                  <AiOutlineClose />
                </span>
                <img
                  src={item.image}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4  sm:w-full">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h2>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => dispatch(setDecreaseQuantity(item))}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-white"
                      >
                        -
                      </span>
                      <span className="h-8 w-8 border bg-white text-center text-xs outline-none flex justify-center items-center">
                        {item?.quantity}
                      </span>
                      <span
                        onClick={() => dispatch(setIncreaseQuantity(item))}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-white"
                      >
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-3">
                      <NumericFormat
                        value={item?.price * item?.quantity}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${totalAmt}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${totalAmt + 4.99}</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
