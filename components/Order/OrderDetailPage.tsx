"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrderDetailSkeleton from "../Skeletons/OrderDetailSkeleton";
import { ShowDetail } from "./ShowDetail";
import { orderService } from "@/services/orderService";

interface Props {
  orderId: any;
}

const OrderDetailPage: React.FC<Props> = ({ orderId }) => {
  const [order, setOrder] = useState<any | null>();
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const [loading, setLoading] = useState(true);

  const getOrderDetails = async () => {
    try {
      const response = await orderService.getSingleOrder(orderId);
      if (response.success) {
        setLoading(false);
        setOrder(response.data);
      } else {
        setLoading(false);
        setOrder(null);
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    token && orderId && getOrderDetails();
  }, [token, orderId]);

  if (!order && !loading) {
    return <div className="flex items-center justify-center">NOT FOUND</div>;
  }

  return (
    <div className="border p-5 lg:p-6 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-gray-200 lg:border-gray-100 bg-white">
      {loading ? <OrderDetailSkeleton /> : <ShowDetail data={order} />}
    </div>
  );
};

export default OrderDetailPage;
