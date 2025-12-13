"use client";
import NoOrderFound from "@/components/Order/NoOrderFound";
import OrderCard from "@/components/Order/OrderCard";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { orderService } from "@/services/orderService";

const Orders = () => {
  const [myOrders, setMyOrders] = useState<any[] | null>(null);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const fetchMyOrders = async () => {
    try {
      const response = await orderService.getCustomerOrder();
      if (response.success) {
        setMyOrders(response.data);
      } else {
        setMyOrders([]);
      }
      // const response = await fetch(
      //   `${process.env.BACKEND}/api/getCustomerOrder`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${process.env.API_KEY}`,
      //       "Authorization-Customer": `Bearer ${token}`,
      //     },
      //   }
      // );
      // const result = await response.json();
      // if (response.ok) {
      //   setMyOrders(result.data);
      // } else {
      //   console.error(result.error);
      // }
    } catch (error) {
      console.error("Internal Server Error", error);
      return;
    }
  };

  useEffect(() => {
    token && fetchMyOrders();
  }, [token]);
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium tracking-wide text-templateText">
        My Orders
      </h2>
      {myOrders?.length === 0 && (
        <div className="flex items-center justify-center">
          <NoOrderFound />
        </div>
      )}
      <div className="space-y-4">
        {myOrders?.map((item, index) => (
          <div key={index}>
            <OrderCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
