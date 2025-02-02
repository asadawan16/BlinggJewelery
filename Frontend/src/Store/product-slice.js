import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    SelectedProduct: null,
    Toggle: false,
    showUpdateForm: false,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action) {
      state.SelectedProduct = action.payload;
    },
    setShowUpdateForm(state, action) {
      state.showUpdateForm = action.payload;
    },
    setToggle(state, action) {
      state.Toggle = action.payload;
    },
  },
});

export const productActions = ProductSlice.actions;
export default ProductSlice;
