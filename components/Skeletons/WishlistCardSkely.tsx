import React from "react";

const WishlistCardSkely = () => {
  return (
    <div className="space-y-3">
      <div className="aspect-[3/3.5] bg-gray-200 animate-pulse"></div>
      <div className="w-full h-6 bg-gray-200 animate-pulse"></div>
      <div className="flex items-center gap-3">
        <div className="w-1/3 h-6 bg-gray-200 animate-pulse"></div>
        <div className="w-1/3 h-6 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default WishlistCardSkely;
