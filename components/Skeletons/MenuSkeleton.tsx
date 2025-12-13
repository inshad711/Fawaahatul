import React from "react";

const MenuSkeleton = () => {
  return (
    <div className="flex items-center gap-4 justify-center">
      <div className="bg-gray-100 h-8 w-36 rounded animate-pulse" />
      <div className="bg-gray-100 h-8 w-36 rounded animate-pulse" />
      <div className="bg-gray-100 h-8 w-36 rounded animate-pulse" />
      <div className="bg-gray-100 h-8 w-36 rounded animate-pulse" />
      <div className="bg-gray-100 h-8 w-36 rounded animate-pulse" />
    </div>
  );
};

export default MenuSkeleton;
