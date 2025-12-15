"use client";
import { createCheckoutSession } from "@/lib/stripe-api";
import { setProcessingOrder } from "@/store/slice/CheckoutPage/checkoutToggle";
import { RootState } from "@/store/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const StripePayment = () => {
  const dispatch = useDispatch();

  const handleStripePayment = async () => {
    dispatch(setProcessingOrder(true));
    try {
      const response = await createCheckoutSession({});
      if (response.success && response.data) {
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to create checkout session!!");
        dispatch(setProcessingOrder(false));
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to initiate payment");
      dispatch(setProcessingOrder(false));
    }
  };

  return (
    <div className="space-y-6 text-templateText">
      <h2 className="text-[20px] lg:text-[22px] font-medium">Payment Method</h2>
      <div>
        <button
          onClick={handleStripePayment}
          className="flex items-center justify-center gap-0 bg-gradient-to-r from-[#9966FF] via-[#4254EF] to-[#14EAE2] w-full py-3 rounded-md font-semibold"
        >
          Pay Using
          <img
            src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2020/05/Stripe-logo-white_lg.png"
            alt=""
            className="h-7"
          />
        </button>
      </div>
    </div>
  );
};

export default StripePayment;
