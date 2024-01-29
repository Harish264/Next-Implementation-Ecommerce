import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "",
  error: "",
  category: "",
  cartProduct: [],
  totalAmount: 0,
};

export const getProductList = createAsyncThunk("products", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.log("Error fetching Products", error);
  }
});

export const getPDPproduct = createAsyncThunk("products", async (payload) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${payload}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching Product", error);
  }
});

export const postAddtoCart = createAsyncThunk("cart", async (payload) => {
  try {
    const response = await axios.post("/api/addToCart", payload);
    return response.data;
  } catch (error) {
    console.log("Error fetching Product", error);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCategories(state, action) {
      state.category = action.payload;
    },
    setCartProduct(state, action) {
      state.cartProduct = action.payload;
    },
    setAddToCart(state, action) {
      const { pdpData, quantity } = action.payload;
      const existingProduct = state?.cartProduct?.find(
        (item) => item.id === pdpData.id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cartProduct.push({ ...pdpData, quantity });
      }
    },
    setIncreaseQuantity(state, action) {
      const existingProduct = state.cartProduct.find(
        (item) => item.id === action.payload.id
      );
      existingProduct && existingProduct.quantity++;
    },
    setDecreaseQuantity(state, action) {
      const existingProduct = state.cartProduct.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
    deleteProduct(state, action) {
      state.cartProduct = state.cartProduct.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(postAddtoCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddtoCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartProduct = action.payload;
      })
      .addCase(postAddtoCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      });
  },
});

export const {
  setProducts,
  setCategories,
  setAddToCart,
  setCartProduct,
  setIncreaseQuantity,
  setDecreaseQuantity,
  setTotalAmount,
  deleteProduct,
} = productSlice.actions;
export const selectProductsState = (state) => state.products;
export default productSlice.reducer;
