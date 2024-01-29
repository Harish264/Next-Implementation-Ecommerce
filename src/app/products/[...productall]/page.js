"use client"

import PDPpage from "@/components/PDPpage";
import PLPpage from "@/components/PLPpage";
import { getProductList, setProducts } from "@/redux/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const Productpage = ({params}) => {
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getProductList())
      .unwrap()
      .then((res) => {
        dispatch(setProducts(res))
      });
  },[]);

if (params.productall?.length === 2) {
  return (
    <PDPpage params={params}/>
  )
} else if (params.productall?.length === 1) {
  return (
    <PLPpage params={params}/>
  )
}
  return (
   null
  );
};

export default Productpage;
