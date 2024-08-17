import { createSlice } from "@reduxjs/toolkit";
import {saveToLocalStorage, getFromLocalStorage} from "../utils/helper";

const CART = 'cart'

const cartSlice = createSlice({
  name: CART,
  initialState: getFromLocalStorage(CART),
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(CART, state);
    },
    removeItem: (state, action) => {
      state.filter((item) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state = [];
    },
  },
});

export const { addItem, removeItem, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
