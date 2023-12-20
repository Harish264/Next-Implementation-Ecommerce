import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    products:[],
    status:"",
    error: "",
    category:""
}

export const getProductList = createAsyncThunk(
    "products",async ()=>{
       try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data
       } catch (error) {
        console.log("Error fetching Products",error)
       }
    }
)
export const getPDPproduct= createAsyncThunk("products",async(payload)=>{
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${payload}`)
    return response.data
  } catch (error) {
    console.log("Error fetching Product",error)
  }
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state,action){
            state.products = action.payload
        },
        setCategories(state,action){
            state.category=action.payload
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductList.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getProductList.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(getProductList.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Error fetching products';
        });
    },
})

export const {setProducts,setCategories} = productSlice.actions
export const selectProductsState = (state)=>state
export default productSlice.reducer