import React from "react";

const CartPageSkeleton = () => {
  return (
    <div className="templateContainer space-y-4 py-6 md:py-8 lg:py-12">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-8 w-32 bg-gray-100 animate-pulse rounded"></div>
      </div>
      <div className="h-24 w-full bg-gray-100 animate-pulse rounded"></div>
      <div className="h-24 w-full bg-gray-100 animate-pulse rounded"></div>
      <div className="flex items-center justify-between">
        <div className=""></div>
        <div className="h-8 w-1/2 md:w-1/3 bg-gray-100 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
