import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import colorsSlice from "./colorsSlice";
import brandsSlice from "./brandsSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    products: productsSlice,
    colors: colorsSlice,
    brands: brandsSlice,
    cart: cartSlice,
    user: userSlice,
  },
});
