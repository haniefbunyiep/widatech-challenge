import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (
        !state.selectedProducts.find(
          (product) => product.product_id === action.payload.product_id,
        )
      )
        state.selectedProducts.push(action.payload);
      else {
        state.selectedProducts;
      }
    },
    removeProduct: (state, action) => {
      return state.selectedProducts.filter(
        (product) => product.product_id !== action.payload.product_id,
      );
    },
    resetProduct: () => {
      return initialState;
    },
  },
});

export const { addProduct, removeProduct, resetProduct } = productSlice.actions;

export default productSlice;
