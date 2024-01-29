import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthBoolean(state, action) {
      console.log("ACTION", action.payload);
      state.isAuth = action.payload;
    },
  },
});
export const { setAuthBoolean } = authSlice.actions;

export const authState = (state) => state.auth;
export default authSlice.reducer;
