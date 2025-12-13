import { createSlice } from "@reduxjs/toolkit";

interface GuestAddToCartOptions {
  cartUpdated: boolean;
  toggleCartDrawer: boolean;
}

const initialState: GuestAddToCartOptions = {
  cartUpdated: false,
  toggleCartDrawer: false,
};

export const cartToggle = createSlice({
  name: "cartToggle",
  initialState,
  reducers: {
    toggleCartUpdated: (state) => {
      state.cartUpdated = !state.cartUpdated;
    },
    toggleCartDrawer: (state) => {
      state.toggleCartDrawer = !state.toggleCartDrawer;
    },
  },
});

export const { toggleCartUpdated, toggleCartDrawer } = cartToggle.actions;

export default cartToggle.reducer;
