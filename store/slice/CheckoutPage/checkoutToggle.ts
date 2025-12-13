import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showShippingAddress: false,
  optionModal: false,
  showShippingMethod: false,
  showPaymentMethod: false,
  showPlaceOrder: false,
  allowedToPlaceOrder: false,
  showViewOrderDetailModal: false,
  orderPlaced: false,
  processingOrder: false,
  processingMessage: "",
  orderPlacedSuccessfully: false,
};

const checkoutToggleSlice = createSlice({
  name: "checkoutToggle",
  initialState,
  reducers: {
    setProcessingMessage: (state, action: PayloadAction<string>) => {
      state.processingMessage = action.payload;
    },
    setProcessingOrder: (state, action: PayloadAction<boolean>) => {
      state.processingOrder = action.payload;
    },
    setOrderPlacedSuccessfully: (state, action: PayloadAction<boolean>) => {
      state.orderPlacedSuccessfully = action.payload;
    },

    setOrderPlaced: (state, action: PayloadAction<boolean>) => {
      state.orderPlaced = action.payload;
    },

    setShowViewOrderDetailModal: (state, action: PayloadAction<boolean>) => {
      state.showViewOrderDetailModal = action.payload;
    },

    setShowShippingAddress: (state, action: PayloadAction<boolean>) => {
      state.showShippingAddress = action.payload;
    },
    setOptionModal: (state, action: PayloadAction<boolean>) => {
      state.optionModal = action.payload;
    },
    toggleShowShippingAddress: (state) => {
      state.showShippingAddress = !state.showShippingAddress;
    },
    setShowShippingMethod: (state, action: PayloadAction<boolean>) => {
      state.showShippingMethod = action.payload;
    },
    toggleShowShippingMethod: (state) => {
      state.showShippingMethod = !state.showShippingMethod;
    },
    setShowPaymentMethod: (state, action: PayloadAction<boolean>) => {
      state.showPaymentMethod = action.payload;
    },
    toggleShowPaymentMethod: (state) => {
      state.showPaymentMethod = !state.showPaymentMethod;
    },
    setShowPlaceOrder: (state, action: PayloadAction<boolean>) => {
      state.showPlaceOrder = action.payload;
    },
    toggleShowPlaceOrder: (state) => {
      state.showPlaceOrder = !state.showPlaceOrder;
    },
  },
});

export const {
  setProcessingMessage,
  setShowViewOrderDetailModal,
  setShowShippingAddress,
  setOptionModal,
  toggleShowShippingAddress,
  setShowShippingMethod,
  toggleShowShippingMethod,
  setShowPaymentMethod,
  toggleShowPaymentMethod,
  setShowPlaceOrder,
  toggleShowPlaceOrder,
  setOrderPlaced,
  setProcessingOrder,
  setOrderPlacedSuccessfully,
} = checkoutToggleSlice.actions;

export default checkoutToggleSlice.reducer;
