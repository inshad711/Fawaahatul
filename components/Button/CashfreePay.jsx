"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cashfreePayment } from "@/lib/cashfreeGateway";

const CashfreePay = () => {
  const handleClick = async () => {
    const result = await cashfreePayment();
    // const result = await cashfreePayment();
    if (result.status === "success") {
      // console.log("Payment successful");
    } else {
      // console.log("Payment failed");
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Pay</Button>
    </div>
  );
};

export default CashfreePay;
