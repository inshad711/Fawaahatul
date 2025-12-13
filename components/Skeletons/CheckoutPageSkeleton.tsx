import Image from "next/image";
import React from "react";

const CheckoutPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-20 w-full flex flex-col lg:flex-row py-4 md:py-6 lg:py-8">
      <div className="w-full lg:w-[57%] lg:border-r border-gray-200 lg:pr-10 h-full space-y-5">
        <div className="hidden lg:flex w-full gap-4 items-center justify-center">
          <Image
            src={"/assets/logos/logotransbg.png"}
            className="w-44 h-auto object-contain"
            alt="Logo"
            height={100}
            width={200}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4 ">
          <div className="bg-gray-300 animate-pulse rounded w-1/4 h-6"></div>
          <div className="bg-gray-300 animate-pulse rounded w-1/4 h-6"></div>
          <div className="bg-gray-300 animate-pulse rounded w-1/4 h-6"></div>
        </div>
        <div className="bg-gray-300 animate-pulse rounded w-full h-8"></div>
        <div className="py-4">
          <hr />
        </div>
        <div className="bg-gray-300 animate-pulse rounded w-1/2 h-4"></div>
        <div className="bg-gray-300 animate-pulse rounded w-full h-8"></div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 animate-pulse rounded w-1/2 h-8"></div>
          <div className="bg-gray-300 animate-pulse rounded w-1/2 h-8"></div>
        </div>
        <div className="py-4">
          <hr />
        </div>
        <div className="bg-gray-300 animate-pulse rounded w-1/2 h-4"></div>
        <div className="bg-gray-300 animate-pulse rounded w-full h-8"></div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 animate-pulse rounded w-1/2 h-8"></div>
          <div className="bg-gray-300 animate-pulse rounded w-1/2 h-8"></div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="bg-gray-300 animate-pulse rounded w-1/3 h-12"></div>
          <div className="bg-gray-300 animate-pulse rounded w-1/3 h-12"></div>
        </div>
      </div>
      <div className="hidden lg:block w-full lg:w-[43%] space-y-5 sticky top-8 h-full lg:pl-10">
        {Array(3)
          .fill(3)
          .map((_, index) => (
            <div key={index} className="flex  items-center justify-between">
              <div className="flex w-full items-center gap-4">
                <div className="animate-pulse h-16 w-16 rounded bg-gray-200 "></div>
                <div className="w-full space-y-2">
                  <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        <div className="py-4">
          <hr />
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="space-y-4 w-1/3">
            <div className="w-1/3 h-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-1/2 h-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="space-y-4 w-1/3">
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
