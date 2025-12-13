import React from "react";

const OrderDetailSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="h-10 w-1/2 bg-gray-100 rounded animate-pulse"></div>
      <div className="h-8 w-full bg-gray-100 rounded animate-pulse"></div>
      <div className="h-8 w-full bg-gray-100 rounded animate-pulse"></div>
      <div className="h-8 w-full bg-gray-100 rounded animate-pulse"></div>
      <div className="h-40 w-full bg-gray-100 rounded animate-pulse"></div>
      <div className="h-40 w-full bg-gray-100 rounded animate-pulse"></div>
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
