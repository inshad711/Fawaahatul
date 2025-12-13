import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  optionModal: boolean;
  openMenu: boolean;
  validated: boolean;
  orderPlaced: boolean;
}

const initialState: ToggleState = {
  optionModal: false,
  openMenu: false,
  validated: false,
  orderPlaced: false,
};

export const toggleSlices = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    setOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.openMenu = action.payload;
    },
    toggleOpenMenu: (state) => {
      state.openMenu = !state.openMenu;
    },

    setOptionModal: (state, action: PayloadAction<boolean>) => {
      state.optionModal = action.payload;
    },
    toggleOptionModal: (state) => {
      state.optionModal = !state.optionModal;
    },
    setValidated: (state, action: PayloadAction<boolean>) => {
      state.validated = action.payload;
    },
    setOrderPlaced: (state, action: PayloadAction<boolean>) => {
      state.orderPlaced = action.payload;
    },
  },
});

export const {
  toggleOptionModal,
  setOptionModal,
  setOpenMenu,
  toggleOpenMenu,
  setValidated,
  setOrderPlaced,
} = toggleSlices.actions;

export default toggleSlices.reducer;
