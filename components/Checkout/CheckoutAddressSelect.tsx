import React from "react";
import Address from "../ProfileComp/Accounts/Address";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CheckoutAddressSelect = () => {
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Delivery</h2>
      <Address isCheckoutPage={true} storedCustomerData={storedCustomerData} />
    </div>
  );
};

export default CheckoutAddressSelect;
