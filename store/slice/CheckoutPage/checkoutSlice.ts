import {
  CartItems,
  CheckoutState,
  CustomerData,
  PaymentMethod,
  ShippingAddress,
} from "@/types/checkout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CheckoutState = {
  customerData: null,
  currency: "INR",
  shippingAddress: {
    firstName: "",
    lastName: "",
    apartment: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    contactNumber: "",
    countryCode: "",
    country: "",
  },
  internalShippingRate: {
    flatRate: 0,
    currency: "USD",
    calculated: false,
    MIN_AMOUNT_FOR_FREE_SHIPPING: "",
  },
  shippingRate: {
    flatRate: 0,
    currency: "INR",
    calculated: false,
    MIN_AMOUNT_FOR_FREE_SHIPPING: "",
  },
  shippingMethod: null,
  paymentMethod: [],
  selectedPaymentMethod: null,
  cartData: {
    cartItems: [],
    totalAmount: 0,
    totalDiscount: "",
    discount_value: 0,
    discountType: "",
    totalTax: 0,
    totalTaxableAmount: 0,
  },
  formErrors: {},
  is_cod_enabled: false,
  min_order_amount: 0,
  // orderSummary: [],
};

const newCheckoutSlice = createSlice({
  name: "newCheckout",
  initialState,
  reducers: {
    // Set order summary
    // setOrderSummary: (state, action: PayloadAction<any>) => {
    //   state.orderSummary.push(action.payload);
    // },
    setInternationalShipping: (state, action: PayloadAction<number>) => {
      if (state.internalShippingRate) {
        state.internalShippingRate.flatRate = action.payload;
      }
    },
    // Set currency
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },

    // Set global cod status
    setGlobalCodStatus: (state, action: PayloadAction<boolean>) => {
      state.is_cod_enabled = action.payload;
    },
    // Set min order amount
    setMinOrderAmount: (state, action: PayloadAction<number>) => {
      state.min_order_amount = action.payload;
    },

    // Replace entire customerData object
    setCustomerData: (state, action: PayloadAction<CustomerData>) => {
      state.customerData = action.payload;
    },

    // Update specific fields in customerData
    updateCustomerData: (
      state,
      action: PayloadAction<Partial<CustomerData>>
    ) => {
      if (!state.customerData) {
        state.customerData = {};
      }
      state.customerData = {
        ...state.customerData,
        ...action.payload,
      };
    },

    // Set full shipping address
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },

    // Update specific fields in shippingAddress
    updateShippingAddress: (
      state,
      action: PayloadAction<Partial<ShippingAddress>>
    ) => {
      if (!state.shippingAddress) {
        state.shippingAddress = {
          firstName: "",
          lastName: "",
          apartment: "",
          address: "",
          state: "",
          city: "",
          postalCode: "",
          contactNumber: "",
          countryCode: "",
          country: "India",
        };
      }
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },

    //Update multiple fields in shippingAddress
    updateMultipleShippingFields: (
      state,
      action: PayloadAction<Partial<ShippingAddress>>
    ) => {
      if (!state.shippingAddress) {
        state.shippingAddress = {
          firstName: "",
          lastName: "",
          apartment: "",
          address: "",
          state: "",
          city: "",
          postalCode: "",
          contactNumber: "",
          countryCode: "",
          country: "India",
        };
      }

      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },

    // Set cart items
    setCartData: (
      state,
      action: PayloadAction<{
        totalDiscount: string;
        discount_value: number;
        discountType: string;
        cart: CartItems["cartItems"];
        totalAmount: number;
        totalTax: number;
        totalTaxableAmount: number;
      }>
    ) => {
      state.cartData = {
        cartItems: action.payload.cart,
        totalAmount: action.payload.totalAmount,
        totalDiscount: action.payload.totalDiscount,
        discount_value: action.payload.discount_value,
        discountType: action.payload.discountType,
        totalTax: action.payload.totalTax,
        totalTaxableAmount: action.payload.totalTaxableAmount,
      };
    },

    // Update cart data
    updateCartData: (
      state,
      action: PayloadAction<Partial<typeof state.cartData>>
    ) => {
      state.cartData = {
        ...state.cartData,
        ...action.payload,
      };
    },

    // updateCartItemField
    updateCartItemField: (
      state,
      action: PayloadAction<{
        id: number;
        fields: Partial<CartItems["cartItems"][number]>; // Flexible for any field update
      }>
    ) => {
      const index = state.cartData.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.cartData.cartItems[index] = {
          ...state.cartData.cartItems[index],
          ...action.payload.fields,
        };
      }
    },

    // Set Payment Methods
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod[]>) => {
      state.paymentMethod = action.payload;
    },

    // Set Shipping Rate
    setShippingRate: (state, action: PayloadAction<any>) => {
      state.shippingRate = action.payload;
    },

    // Set selected Payment Method
    setSelectedPaymentMethod: (state, action: PayloadAction<any>) => {
      state.selectedPaymentMethod = action.payload;
    },

    //Set Form Errors
    setFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.formErrors = action.payload; // ✅ Store form errors
    },
    clearCheckout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setInternationalShipping,
  setCurrency,
  setCustomerData,
  setGlobalCodStatus,
  setMinOrderAmount,
  updateCustomerData,
  updateMultipleShippingFields,
  setShippingAddress,
  updateShippingAddress,
  updateCartItemField,
  updateCartData,
  setCartData,
  setPaymentMethod,
  setShippingRate,
  setSelectedPaymentMethod,
  setFormErrors,
  clearCheckout,
  // setOrderSummary,
} = newCheckoutSlice.actions;

export default newCheckoutSlice.reducer;
