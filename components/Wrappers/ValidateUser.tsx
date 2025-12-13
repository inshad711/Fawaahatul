"use client";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setCustomerData } from "@/store/slice/customerDataSlice";
import { setCustomerCodEnabled } from "@/store/slice/sCheckout";
import { setCartTotal } from "@/store/slice/cartTotalSlice";
import { setValidated } from "@/store/slice/togglesSlice";
import { globalService } from "@/services/globalService";
import { setGlobalSetting } from "@/store/slice/globalSettingSlice";
import { detectLocation } from "@/utils/constants";
import { setGeoLocation } from "@/store/slice/GeoLocationSlice";

interface Props {
  globalSettings: any;
}

const ValidateUser: React.FC<Props> = ({ globalSettings }) => {
  const dispatch = useDispatch();
  const token = Cookies.get(process.env.AUTH_TOKEN!);

  const handleValidation = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.BACKEND}/api/validateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (!response.ok) {
        Cookies.remove(process.env.AUTH_TOKEN!);
        window.location.reload();
      } else {
        dispatch(setCustomerData(result.customerData));
        dispatch(setCartTotal(result.customerData.totalInCart));
        dispatch(setCustomerCodEnabled(result.customerData?.cod_enable_status));
      }
    } catch (error) {
      console.error("Internal Server Error");
      Cookies.remove(process.env.AUTH_TOKEN!);
    } finally {
      dispatch(setValidated(true));
    }
  }, [dispatch, token]);

  const loadGlobals = useCallback(async () => {
    if (typeof window !== "undefined") {
      const storedGeo = localStorage.getItem("geoLocation");
      const timestamp = localStorage.getItem("geoLocationTimestamp");
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;

      if (storedGeo && timestamp && now - Number(timestamp) < oneWeek) {
        dispatch(setGeoLocation(JSON.parse(storedGeo)));
        console.log("GeoLocation loaded from localStorage (not expired)");
      } else {
        try {
          const locationData = await detectLocation();
          if (locationData) {
            localStorage.setItem("geoLocation", JSON.stringify(locationData));
            localStorage.setItem("geoLocationTimestamp", now.toString());
            dispatch(setGeoLocation(locationData));
            console.log("GeoLocation updated from API");
          }
        } catch (error) {
          console.error("Failed to detect location:", error);
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      handleValidation();
    } else {
      dispatch(setValidated(true));
    }
  }, [token, handleValidation, dispatch]);

  useEffect(() => {
    dispatch(setGlobalSetting(globalSettings));
    loadGlobals();
  }, [loadGlobals]);

  return null;
};

export default ValidateUser;
