import React from "react";

const CollectionPageSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
      <div className="bg-[#f2f2f2] animate-pulse rounded-lg w-full aspect-[4/5]" />
    </div>
  );
};

export default CollectionPageSkeleton;
