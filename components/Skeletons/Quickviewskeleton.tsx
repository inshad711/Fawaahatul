import React from "react";

const Quickviewskeleton = () => {
  return (
    <div className="flex gap-8">
      <div className="w-[55%] h-full flex gap-4">
        <div className="aspect-[4/6] rounded animate-pulse w-full bg-gray-200"></div>
        <div className="aspect-[4/6] rounded animate-pulse w-full bg-gray-200"></div>
      </div>
      <div className="w-[45%] h-full space-y-[18.5px]">
        <div className="h-6 w-[80%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="flex w-[70%] gap-4">
          <div className="h-12 w-[100%] bg-gray-200 animate-pulse rounded"></div>
          <div className="h-12 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-[100%] bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default Quickviewskeleton;
