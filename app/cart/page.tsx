import CartPageComp from "@/components/CartPage/CartPageComp";
import { Metadata } from "next";
import React from "react";
import { defaultMetadata } from "@/lib/defaultMetadata";

export const metadata: Metadata = {
  title: `Cart | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  },
};

const Cartpage = () => {
  return <CartPageComp />;
};

export default Cartpage;
