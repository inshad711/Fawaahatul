import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingAddress {
  country: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  saveInfo: boolean;
  isSelected: boolean;
}

interface ShippingCharge {
  flatRate: number;
  currency: string;
  calculated: boolean;
}

interface CheckoutState {
  cartItems: any;
  customerData: any;
  shippingAddress: ShippingAddress;
  paymentDetails: any;
  orderStatus: any;
  shippingCharges: ShippingCharge;
  shippingLoading: boolean;
  selectedPayment: any;
  formErrors: Record<string, string>; // ✅ Form errors state added
  totalAmount: number; // ✅ Added total amount state
  customerEnableCod: boolean; //
}

const defaultShippingAddress: ShippingAddress = {
  country: "IN",
  firstName: "",
  lastName: "",
  company: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  saveInfo: false,
  isSelected: false,
};

const initialState: CheckoutState = {
  cartItems: null,
  customerData: null,
  shippingAddress: defaultShippingAddress,
  paymentDetails: null,
  selectedPayment: "razorpay",
  orderStatus: null,
  shippingCharges: {
    flatRate: 0,
    currency: "INR",
    calculated: false,
  },
  shippingLoading: false,
  formErrors: {},
  totalAmount: 0,
  customerEnableCod: false,
};

export const checkoutSliceNew = createSlice({
  name: "checkoutData",
  initialState,
  reducers: {
    setCartItemsCheckout: (state, action: PayloadAction<any>) => {
      state.cartItems = action.payload;
    },
    setCustomerData: (state, action: PayloadAction<any>) => {
      state.customerData = action.payload;
    },
    updateCustomerDataFields: (
      state,
      action: PayloadAction<Partial<typeof state.customerData>>
    ) => {
      if (!state.customerData) {
        state.customerData = {};
      }
      state.customerData = {
        ...state.customerData,
        ...action.payload,
      };
    },

    setCustomerCodEnabled: (state, action: PayloadAction<any>) => {
      state.customerEnableCod = action.payload;
    },
    setShippingAddress: (
      state,
      action: PayloadAction<Partial<ShippingAddress>>
    ) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
    },
    setPaymentDetails: (state, action: PayloadAction<any>) => {
      state.paymentDetails = action.payload;
    },
    setOrderStatus: (state, action: PayloadAction<any>) => {
      state.orderStatus = action.payload;
    },
    setShippingLoading: (state, action: PayloadAction<boolean>) => {
      state.shippingLoading = action.payload;
    },
    setShippingCharges: (state, action: PayloadAction<ShippingCharge>) => {
      state.shippingLoading = true;
      state.shippingCharges = action.payload;
      state.shippingLoading = false;
    },
    setSelectPayment: (state, action: PayloadAction<any>) => {
      state.selectedPayment = action.payload;
    },
    setFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.formErrors = action.payload; // ✅ Store form errors
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload; // ✅ Store total amount
    },
    updateCartItem: (
      state,
      action: PayloadAction<{
        id: string | number;
        variant_name: string;
        updates: Partial<any>;
      }>
    ) => {
      state.cartItems.cart = state.cartItems.cart?.map((item: any) =>
        item.id === action.payload.id &&
        item.variant_name === action.payload.variant_name
          ? { ...item, ...action.payload.updates }
          : item
      ) as any;
    },

    resetCheckout: () => initialState,
  },
});

export const {
  setCartItemsCheckout,
  setCustomerData,
  updateCustomerDataFields,
  setShippingAddress,
  setPaymentDetails,
  setOrderStatus,
  resetCheckout,
  setShippingCharges,
  setShippingLoading,
  setSelectPayment,
  setFormErrors, // ✅ Export new action
  setTotalAmount,
  updateCartItem,
  setCustomerCodEnabled,
} = checkoutSliceNew.actions;

export default checkoutSliceNew.reducer;
