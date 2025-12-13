"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type SupportedCurrency = "USD" | "SAR" | "AED";

export const useFormatAmount = () => {
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );

  const country = geoLocation?.countryName?.toLowerCase().trim();

  const exchangeRate = globalSetting?.exchangeRate;

  const getCurrencyByCountry = (): SupportedCurrency => {
    if (country === "saudi arabia") return "SAR";
    if (country === "united arab emirates") return "AED";
    return "USD"; // default
  };

  const formatAmount = (amountInINR: number): string => {
    const currency = getCurrencyByCountry();

    const rateMap: Record<SupportedCurrency, number> = {
      USD: exchangeRate?.usd ?? 1,
      SAR: exchangeRate?.sar ?? 1,
      AED: exchangeRate?.aed ?? 1,
    };

    const convertedAmount = amountInINR * rateMap[currency];

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  };

  const convertAmount = (amountInINR: number): number => {
    const currency = getCurrencyByCountry();

    const rateMap: Record<SupportedCurrency, number> = {
      USD: exchangeRate?.usd ?? 1,
      SAR: exchangeRate?.sar ?? 1,
      AED: exchangeRate?.aed ?? 1,
    };

    return Math.round(amountInINR * rateMap[currency] * 100) / 100;
  };

  return { formatAmount, convertAmount };
};
