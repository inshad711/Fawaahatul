import React from "react";
import MainProductCard from "../Cards/MainProductCard";

const LatestArrivals = () => {
  return (
    <div className="templateContainer py-4 md:py-8 lg:py-10 space-y-4">
      <h2 className="text-3xl font-medium tracking-wider text-text uppercase text-center">
        Latest Arrivals
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* <MainProductCard /> */}
      </div>
    </div>
  );
};

export default LatestArrivals;
