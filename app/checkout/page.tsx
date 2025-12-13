import CheckoutPage from "@/components/Checkout/CheckoutPage";
import OrderConfirmationComp from "@/components/NewCheckoutComp/OrderConfirmationComp";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Checkout | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  },
};

const Checkout = async () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CheckoutPage />
    </div>
  );
};

export default Checkout;
