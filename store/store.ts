import { configureStore } from "@reduxjs/toolkit";
import { customerDataSlice } from "./slice/customerDataSlice";
import { productDataSlice } from "./slice/productDataSlice";
import { cartToggle } from "./slice/CartToggle";
import { cartTotalSlice } from "./slice/cartTotalSlice";
import { checkoutCartSlice } from "./slice/checkoutCartSlice";
import { checkoutSliceNew } from "./slice/sCheckout";
import { cartItemSlice } from "./slice/cartItemSlice";
import { toggleSlices } from "./slice/togglesSlice";
import newCheckoutReducer from "./slice/CheckoutPage/checkoutSlice";
import checkoutToggleReducer from "./slice/CheckoutPage/checkoutToggle";
import { recommendedSlice } from "./slice/recommendedSlice";
import orderSummaryReducer from "./slice/CheckoutPage/orderSummary";
import { globalSettingSlice } from "./slice/globalSettingSlice";
import { geoLocation } from "./slice/GeoLocationSlice";

export const store = configureStore({
  reducer: {
    customerData: customerDataSlice.reducer,
    productData: productDataSlice.reducer,
    cartToggle: cartToggle.reducer,
    cartTotal: cartTotalSlice.reducer,
    globalSetting: globalSettingSlice.reducer,
    checkoutData: checkoutSliceNew.reducer,
    checkoutCartData: checkoutCartSlice.reducer,
    checkoutsNew: checkoutSliceNew.reducer,
    cartItem: cartItemSlice.reducer,
    toggle: toggleSlices.reducer,
    // NEW CHECKOUT SLICE
    newCheckout: newCheckoutReducer,
    checkoutToggle: checkoutToggleReducer,
    recommended: recommendedSlice.reducer,
    orderSummary: orderSummaryReducer,
    geoLocation: geoLocation.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
