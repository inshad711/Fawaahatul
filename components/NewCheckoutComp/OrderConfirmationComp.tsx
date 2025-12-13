import { CircleCheck } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const OrderConfirmationComp = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center p-12">
      <div className="max-w-[600px] space-y-5 w-full bg-white p-6 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.10)]">
        <div className="flex flex-col items-center gap-1 text-green-500">
          <CircleCheck size={50} strokeWidth={1.5} />
          <h2 className="text-base lg:text-lg font-semibold capitalize tracking-wide">
            Order placed successfully
          </h2>
        </div>
        {/* -------- */}
        <hr />
        {/* -------- */}
        <div className="space-y-2 ">
          <h3 className="text-lg">Your order is confirmed</h3>
          <p className="text-sm text-gray-500">
            We've received your order and we are processing it. You will receive
            an email with details of your order once it is completed.
          </p>
        </div>
        {/* ------------ */}
        <div className="w-full p-4 space-y-5 border rounded-lg">
          <h2 className="text-lg font-semibold text-templateText tracking-wide">
            Customer Information
          </h2>
          <div className="space-y-2">
            <h3 className="font-medium">Shipping Address</h3>
            <div className="text-sm tracking-wide text-gray-700">
              <h4>Ansari Afroz</h4>
              <p>123 Main St</p>
              <p>City, State, Zip</p>
              <p>India</p>
              <p>7208820113</p>
            </div>
          </div>
          {/* <div className="space-y-2">
            <h3 className="font-medium">Payment Method</h3>
            <div className="text-sm tracking-wide text-gray-700">
              <p>Online Payment (Express Delivery Within 48 hours)</p>
            </div>
          </div> */}
        </div>
        {/* ------------ */}
        <div className="w-full p-4 space-y-5 border rounded-lg">
          <h2 className="text-lg font-semibold text-templateText tracking-wide">
            Order Summary
          </h2>
        </div>
        {/* ------------- */}
        <Link href={"/"} className="block">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationComp;
