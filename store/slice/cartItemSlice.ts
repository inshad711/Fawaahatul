import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  regularPrice: number;
  sellingPrice: number;
  quantity: number;
  cart_id: number;
  itemTotal: number;
}

interface CartItemState {
  items: CartItem[];
  totalAmount: number;
  grandTotal: number;
}

const initialState: CartItemState = {
  items: [],
  totalAmount: 0,
  grandTotal: 0,
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    setCartItems: (
      state,
      action: PayloadAction<{ items: CartItem[]; grandTotal: number }>
    ) => {
      state.items = action.payload.items;
      state.grandTotal = action.payload.grandTotal;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.grandTotal += action.payload.sellingPrice * action.payload.quantity;
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.grandTotal -= item.sellingPrice * item.quantity; // Remove previous total
        item.quantity = action.payload.quantity;
        item.itemTotal = item.sellingPrice * item.quantity; // Update item total
        state.grandTotal += item.sellingPrice * item.quantity; // Update grand total
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.grandTotal -= itemToRemove.itemTotal;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.grandTotal = 0;
    },
  },
});

export const {
  setCartItems,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
} = cartItemSlice.actions;

export default cartItemSlice.reducer;
