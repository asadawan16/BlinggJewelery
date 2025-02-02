import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    totalPayment: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exisitingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPayment = state.totalPayment + parseInt(newItem.price);
      state.changed = true;
      if (!exisitingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exisitingItem.quantity++;
        exisitingItem.totalPrice =
          parseInt(newItem.price) + parseInt(exisitingItem.totalPrice);
        console.log(exisitingItem.totalPrice);
      }
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalPayment = action.payload.totalPayment;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPayment = 0;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exisitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalPayment = state.totalPayment - parseInt(exisitingItem.price);
      state.changed = true;
      if (exisitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exisitingItem.quantity--;
        exisitingItem.totalPrice =
          parseInt(exisitingItem.totalPrice) - parseInt(exisitingItem.price);
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
