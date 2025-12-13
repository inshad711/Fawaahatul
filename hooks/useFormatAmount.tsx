"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useFormatAmount = () => {
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );

  const isIndia = geoLocation?.countryName?.toLowerCase().trim() === "india";
  const usdRate = globalSetting?.exchangeRate?.usd || 1;

  // Formatted output with currency symbol
  const formatAmount = (amount: number): string => {
    let convertedAmount = amount;
    let currency = "INR";

    if (isIndia) {
      currency = "INR";
    } else {
      convertedAmount = amount * usdRate;
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  };

  // Raw number (converted amount only)
  const convertAmount = (amount: number): number => {
    if (isIndia) return amount;
    return Math.round(amount * usdRate * 100) / 100;
  };

  return { formatAmount, convertAmount };
};
