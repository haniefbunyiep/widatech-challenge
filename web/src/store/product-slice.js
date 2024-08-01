import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.selectedProducts.find(
        (p) => p.product_id === product.product_id,
      );
      if (!existingProduct) {
        state.selectedProducts.push(product);
      }
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (p) => p.product_id !== action.payload.product_id,
      );
    },
    resetProduct: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addProduct, removeProduct, resetProduct } = productSlice.actions;

export default productSlice;
