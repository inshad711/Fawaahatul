import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  orderSummary: [],
};

const orderSummarySlice = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {
    // Set order summary
    setOrderSummary: (state, action: PayloadAction<any>) => {
      state.orderSummary.push(action.payload);
    },
  },
});

export const { setOrderSummary } = orderSummarySlice.actions;

export default orderSummarySlice.reducer;
