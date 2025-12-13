"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import MobileFilter from "./MobileFilter";
import MobileSortby from "./MobileSortby";

const FilterHeader = ({ filterItems }: { filterItems: any[] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setLoading(false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="hidden lg:flex space-x-4">
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded"></div>
          <div className="h-8 w-48 bg-gray-100 animate-pulse rounded"></div>
        </div>
        <div className="lg:hidden flex items-center justify-between space-x-4">
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded"></div>
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="flex w-full items-center justify-between">
          <MobileFilter filterItems={filterItems} />
          <MobileSortby />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <Filter filterItems={filterItems} />
        </div>
      )}
    </>
  );
};

export default FilterHeader;
