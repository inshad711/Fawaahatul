"use client";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import React from "react";

const FormatAmount = ({ price }: { price: any }) => {
  const { formatAmount } = useFormatAmount();
  return <>{formatAmount(Number(price))}</>;
};

export default FormatAmount;
