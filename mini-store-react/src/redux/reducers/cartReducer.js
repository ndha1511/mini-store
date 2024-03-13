import { createSlice } from '@reduxjs/toolkit';

const cartStore = localStorage.getItem('cart');
const cart = JSON.parse(cartStore);
const initialState = {
  cart: cartStore && cart.length > 0 ? true : false,
}

export const cartReducer = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    add: (state) => {
      state.cart = true;
    },
    remove: (state) => {
      state.cart = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartReducer.actions

export default cartReducer.reducer