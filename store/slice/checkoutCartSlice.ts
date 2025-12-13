import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the cart item interface
interface CartItem {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  regularPrice: number;
  sellingPrice: number;
  slug: string;
  isVariantProduct: boolean;
  combination: any;
  quantity: number;
}

// Define the state type
interface CheckoutCartState {
  items: CartItem[];
}

// Initial state
const initialState: CheckoutCartState = {
  items: [],
};

// Create the checkout cart slice
export const checkoutCartSlice = createSlice({
  name: "checkoutCart",
  initialState,
  reducers: {
    // ✅ Add multiple items but prevent duplicates
    addItems: (state, action: PayloadAction<CartItem[]>) => {
      const newItems = action.payload;
      const existingIds = new Set(state.items.map((item) => item.id));

      // Only add items that are not already in the cart
      const filteredItems = newItems.filter(
        (item) => !existingIds.has(item.id)
      );

      state.items = [...state.items, ...filteredItems]; // Merge new items
    },

    // ✅ Remove all items from the cart
    removeAllItems: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { addItems, removeAllItems } = checkoutCartSlice.actions;

// Export reducer
export default checkoutCartSlice.reducer;
