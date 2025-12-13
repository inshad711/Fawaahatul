import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartTotalState {
  cartTotal: number;
}

const initialState: CartTotalState = {
  cartTotal: 0,
};

export const cartTotalSlice = createSlice({
  name: "cartTotal",
  initialState,
  reducers: {
    setCartTotal: (state, action: PayloadAction<number>) => {
      state.cartTotal = action.payload;
    },
    incrementCartTotal: (state, action: PayloadAction<number | undefined>) => {
      const incrementValue = action.payload ?? 1;
      state.cartTotal = Number(state.cartTotal) + incrementValue; // Explicit conversion
    },
    decrementCartTotal: (state, action: PayloadAction<number | undefined>) => {
      const decrementValue = action.payload ?? 1;
      state.cartTotal = Number(state.cartTotal) - decrementValue; // Explicit conversion
    },
    clearCartTotal: (state) => {
      state.cartTotal = 0;
    },
  },
});

export const {
  setCartTotal,
  incrementCartTotal,
  decrementCartTotal,
  clearCartTotal,
} = cartTotalSlice.actions;

export default cartTotalSlice.reducer;
