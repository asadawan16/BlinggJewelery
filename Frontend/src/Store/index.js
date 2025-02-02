import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import ProductSlice from "./product-slice";
import authSlice from "./Auth-Slice";
import orderSlice from "./Order-Slice";
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    product: ProductSlice.reducer,
    auth: authSlice.reducer,
    order: orderSlice.reducer,
  },
});
export default store;
