"use client";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "./Accounts/Profile";
import Orders from "./Accounts/Orders";
import Wishlist from "./Accounts/Wishlist";
import Address from "./Accounts/Address";

const ProfileDetail = ({ currentTab }: any) => {
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );

  return (
    <>
      {currentTab === "profile" && (
        <Profile customer_id={storedCustomerData?.customer_id} />
      )}
      {/* {currentTab === "address" && (
        <Address storedCustomerData={storedCustomerData} />
      )} */}
      {currentTab === "orders" && <Orders />}
      {currentTab === "wishlist" && (
        <Wishlist customerId={storedCustomerData?.customer_id} />
      )}
    </>
  );
};

export default ProfileDetail;
