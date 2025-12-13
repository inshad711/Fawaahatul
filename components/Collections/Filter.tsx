"use client";

import { ArrowDownAZ, ChevronDown, FilterIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DualRangeSlider } from "../ui/DualRangeSlider";
import { sortByList } from "@/utils/constants";
import { motion } from "framer-motion";
import { useHandleFilter } from "@/hooks/useHandleFilter";
import { useHandleSort } from "@/hooks/useHandleSort";
import { useSearchParams } from "next/navigation";

const Filter = ({ filterItems }: { filterItems: any[] }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 100000]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  // Use filter and sort hooks
  const { filters, toggleFilter, addFilter, clearFilter } = useHandleFilter();
  const { sort, setSortOption, clearSort } = useHandleSort();

  // Close filter and sort dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize tempPriceRange from URL filters
  useEffect(() => {
    if (filters?.price) {
      const [min, max] = filters.price.map(Number);
      setTempPriceRange([min, max]);
    }
  }, [filters?.price]);

  // Handle price range application
  const handleApplyPrice = () => {
    addFilter("price", tempPriceRange.map(String));
  };

  // Toggle filter and sort dropdowns
  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
    setIsSortOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortOpen((prev) => !prev);
    setIsFilterOpen(false);
  };

  // Get the label for the selected sort option
  const selectedSortLabel =
    sortByList.find((item) => item.value === sort)?.label || "Sort by";

  return (
    <div className="relative z-[1]" ref={dropdownRef}>
      {/* Filter Button */}
      <div className="flex items-center gap-1 justify-start">
        <button
          onClick={toggleFilterDropdown}
          className="px-6 py-2 text-sm bg-templateText border hover:opacity-90 border-templateText text-white flex items-center gap-2"
        >
          <FilterIcon size={16} strokeWidth={1.5} />
          <span>Filter</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-[230px] relative">
            <button
              onClick={toggleSortDropdown}
              className="w-full text-sm tracking-wide bg-white border border-templateText text-templateText py-2 flex items-center justify-between px-6 cursor-pointer relative gap-10"
            >
              <span className="flex items-center gap-2">
                <ArrowDownAZ size={16} strokeWidth={1.5} />
                <span>{selectedSortLabel}</span>
              </span>
              <ChevronDown size={16} strokeWidth={1.5} />
            </button>
            <div
              className={`${
                isSortOpen
                  ? "translate-y-0 opacity-100 visible"
                  : "translate-y-3 opacity-0 invisible"
              } bg-white w-full border absolute transition-all ease-in-out duration-300 left-0 top-full`}
            >
              {sortByList.map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={index}
                  onClick={() => {
                    setSortOption(item.value);
                    setIsSortOpen(false); // Close dropdown after selection
                  }}
                  className="text-xs tracking-wide px-4 py-2.5 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <span>{item.label}</span>
                  {sort === item.value && (
                    <svg
                      className="w-3.5 h-3.5 text-templateText"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </motion.div>
              ))}
              {sort && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    clearSort();
                    setIsSortOpen(false); // Close dropdown after clearing
                  }}
                  className="text-xs tracking-wide px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Clear Sort
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div
        className={`absolute left-0 top-full min-w-[1100px] shadow-md bg-white transition-all duration-500 ease-in-out ${
          isFilterOpen
            ? "max-h-[400px] overflow-y-scroll"
            : "max-h-0 overflow-hidden overflow-y-scroll"
        }`}
      >
        <div className="grid grid-cols-4">
          {filterItems?.map((category) => (
            <div key={category.key} className="pb-4 text-sm space-y-4">
              {/* Section Header */}
              <div className="border-y sticky top-0 bg-white z-10 py-3 px-4 text-sm font-medium flex justify-start gap-2">
                <span>{category.label}</span>
                {filters[category.key]?.length > 0 && (
                  <button
                    onClick={() => clearFilter(category.key)}
                    className="text-red-500 underline text-xs"
                  >
                    reset
                  </button>
                )}
              </div>

              {/* Filter Options */}
              <div className="px-4 py-2">
                {category.key === "price" ? (
                  <div className="space-y-2">
                    <DualRangeSlider
                      value={tempPriceRange}
                      onValueChange={setTempPriceRange}
                      min={0}
                      max={100000}
                      step={1}
                    />
                    <button
                      onClick={handleApplyPrice}
                      className="bg-templateText text-white text-xs px-4 py-1.5 rounded !mt-4 hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {category.list?.slice(0, 4)?.map((item: any) => (
                      <label
                        key={item.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            filters[category.key]?.includes(item.value) || false
                          }
                          onChange={() =>
                            toggleFilter(category.key, item.value)
                          }
                          className="hidden"
                        />
                        <span
                          className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                            filters[category.key]?.includes(item.value)
                              ? "bg-templateText border-templateText"
                              : "bg-white border-gray-400"
                          }`}
                        >
                          {filters[category.key]?.includes(item.value) && (
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        <span className="ml-1 text-[12px] text-templateBlack">
                          {item.label}
                          <span className="ml-1 text-gray-500 font-semibold text-[10px]">
                            ({item.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
