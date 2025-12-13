import { createSlice } from "@reduxjs/toolkit";

interface RecommendedState {
  recommendedProducts: any[] | null;
}

const initialState: RecommendedState = {
  recommendedProducts: null,
};
export const recommendedSlice = createSlice({
  name: "recommended",
  initialState,
  reducers: {
    setRecommendedProducts: (state, action) => {
      state.recommendedProducts = action.payload;
    },
  },
});

export const { setRecommendedProducts } = recommendedSlice.actions;

export default recommendedSlice.reducer;
