import { useFormatAmount } from "@/hooks/useFormatAmount";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const ShippingMethod = () => {
  const { shippingCharges, shippingLoading } = useSelector(
    (state: RootState) => state.checkoutsNew
  );
  const { flatRate, currency } = shippingCharges || {
    flatRate: 0,
    currency: "INR",
  };
  const { formatAmount } = useFormatAmount();
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Shipping Method</h2>
      <div className="border rounded-lg mb-3 overflow-hidden p-4 flex items-center justify-between bg-gray-100 cursor-pointer border-primary">
        <div className="flex items-center gap-3 w-full justify-between">
          {/* ✅ Skeleton for Heading */}
          {shippingLoading ? (
            <div className="w-56 h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <h3 className="font-medium">
              Online Payment (Express Delivery Within 48 hours)
            </h3>
          )}

          {/* ✅ Skeleton for Price */}
          {shippingLoading ? (
            <div className="w-16 h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <p
              className={`font-bold tracking-wide ${
                flatRate === 0 ? "text-green-600" : "text-gray-900"
              }`}
            >
              {flatRate === 0 ? "FREE" : formatAmount(flatRate)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
