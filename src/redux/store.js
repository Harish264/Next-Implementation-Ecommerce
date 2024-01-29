// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  products: productSlice,
  auth: authSlice,
  // other slices...
});

export const store = configureStore({
  reducer: rootReducer,
});
