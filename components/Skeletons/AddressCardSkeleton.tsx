import React from "react";

const AddressCardSkeleton = () => {
  return (
    <div className="space-y-2 p-3 border rounded-md">
      <div className="bg-gray-200 rounded h-6 animate-pulse" />
      <div className="flex gap-2">
        <div className="bg-gray-200 rounded h-6 w-1/4 animate-pulse" />
        <div className="bg-gray-200 rounded h-6 w-1/4 animate-pulse" />
      </div>
      <div className="bg-gray-200 rounded h-4 animate-pulse" />
      <div className="bg-gray-200 rounded h-4 animate-pulse" />
      {/* <div className="bg-gray-200 rounded h-8 animate-pulse" /> */}
    </div>
  );
};

export default AddressCardSkeleton;
