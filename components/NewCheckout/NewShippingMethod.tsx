import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { useFormatAmount } from "@/hooks/useFormatAmount";

const NewShippingMethod = () => {
  const { shippingRate } = useSelector((state: RootState) => state.newCheckout);
  const { formatAmount } = useFormatAmount();
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Shipping Method</h2>
      <div className="border rounded-lg mb-3 overflow-hidden p-4 flex items-center justify-between bg-gray-100 cursor-pointer border-primary">
        <div className="flex items-center gap-3 w-full justify-between">
          {/* ✅ Skeleton for Heading */}
          {false ? (
            <div className="w-56 h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <h3 className="font-medium">
              Online Payment (Express Delivery Within 48 hours)
            </h3>
          )}

          {/* ✅ Skeleton for Price */}
          {false ? (
            <div className="w-16 h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <p
              className={`font-bold tracking-wide ${
                shippingRate?.flatRate === 0
                  ? "text-green-600"
                  : "text-gray-900"
              }`}
            >
              {shippingRate?.flatRate === 0
                ? "FREE"
                : formatAmount(Number(shippingRate?.flatRate))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewShippingMethod;
