import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.selectedProducts.find(
        (product) => product.product_id === action.payload.product_id,
      );
      if (!existingProduct) {
        state.selectedProducts.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.product_id !== action.payload,
      );
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice;
