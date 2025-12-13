import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerData {
  customer_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  totalInCart?: number | any;
  customer_media?: string;
  manage_address?: string[];
  address_country?: string;
  state?: string;
  city?: string;
  vendor_id?: string;
  store_name?: string;
  cod_enable_status?: boolean;
  countryjsonb?: {
    flag?: string;
    country_name?: string;
    isoCode?: string;
    currency?: string;
    latitude?: number;
    longitude?: number;
    phonecode?: string;
    timezones?: string[];
  };
}

interface CustomerDataState {
  customerData: CustomerData | null;
}

export const customerDataSlice = createSlice({
  name: "customerData",
  initialState: {
    customerData: null,
  } as CustomerDataState,
  reducers: {
    setCustomerData: (state, action: PayloadAction<CustomerData>) => {
      state.customerData = action.payload;
    },
    clearCustomerData: (state) => {
      state.customerData = null;
    },
  },
});

export const { setCustomerData, clearCustomerData } = customerDataSlice.actions;

export default customerDataSlice.reducer;
