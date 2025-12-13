import { createSlice } from "@reduxjs/toolkit";

interface GeoLocationOptions {
  geoLocation: {
    countryName: string;
    countryCode: string;
    countryCallingCode: string;
    currency: string;
  } | null;
}

const initialState: GeoLocationOptions = {
  geoLocation: null,
};

export const geoLocation = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    setGeoLocation: (state, action) => {
      state.geoLocation = action.payload;
    },
  },
});

export const { setGeoLocation } = geoLocation.actions;

export default geoLocation.reducer;
