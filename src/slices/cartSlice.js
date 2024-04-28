import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItem")
    ? JSON.parse(localStorage.getItem("totalItem"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, action) {
      state.token = action.payload;
    },
    // add to Cart
    // remove from Cart
    // reset Cart
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
