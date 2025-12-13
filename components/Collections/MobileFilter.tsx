"use client";
import { ArrowRight, MoveRight, SlidersHorizontal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DualRangeSlider } from "../ui/DualRangeSlider";
import { useHandleFilter } from "@/hooks/useHandleFilter";

interface MobileFilterProps {
  filterItems: any;
}

const MobileFilter: React.FC<MobileFilterProps> = ({ filterItems }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<[number, number]>([0, 10000]);

  const { filters, toggleFilter, addFilter, clearFilter, clearAllFilters } =
    useHandleFilter();

  // Sync tempValues with filters.price
  useEffect(() => {
    if (filters.price && filters.price.length === 2) {
      const [min, max] = filters.price.map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setTempValues([min, max]);
      }
    } else {
      setTempValues([0, 10000]); // Reset to default when cleared
    }
  }, [filters.price]);

  // Toggle body scroll lock
  useEffect(() => {
    document.body.classList.toggle("no-scroll", showFilter);
    return () => document.body.classList.remove("no-scroll");
  }, [showFilter]);

  const handleFilterClick = (key: string) => setActiveFilter(key);
  const closeFilter = () => {
    setShowFilter(false);
    setActiveFilter(null);
  };

  const handleApplyFilters = () => {
    // Apply price filter if active
    if (activeFilter === "price") {
      addFilter("price", tempValues.map(String));
    }
    closeFilter();
  };

  // Filter out empty filter sections (except price)
  const validFilterItems = filterItems?.filter((item: any) => {
    if (item.key === "price") return true; // Always include price
    return Array.isArray(item.list) && item.list.length > 0;
  });

  return (
    <>
      <div
        className="flex items-center gap-2 text-gray-600 cursor-pointer"
        onClick={() => setShowFilter(true)}
      >
        <SlidersHorizontal size={12} />
        <span className="text-[13px] tracking-wider font-medium">
          Filter by
        </span>
      </div>

      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[888]"
          onClick={closeFilter}
        ></div>
      )}

      <div
        className={`fixed flex flex-col justify-between bottom-0 right-0 h-full w-[85%] lg:w-[25%] bg-white z-[999] transform transition-transform duration-300 ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shadow-md p-4 relative">
          <h3 className="text-center text-sm">Filter by</h3>
          <div
            onClick={closeFilter}
            className="bg-gray-200 absolute cursor-pointer right-3 top-3 rounded-full flex items-center justify-center h-6 w-6"
          >
            <X color="#474747" size={18} />
          </div>
        </div>

        <div className="h-full overflow-y-auto relative">
          <ul className="space-y-4 px-5 py-6">
            {validFilterItems.map((item: any) => (
              <React.Fragment key={item.key}>
                <li
                  onClick={() => handleFilterClick(item.key)}
                  className="flex cursor-pointer justify-between"
                >
                  <span className="tracking-wide text-gray-800 text-sm">
                    {item.label}
                  </span>
                  <MoveRight strokeWidth={1} color="#474747" />
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>

          {activeFilter && (
            <div className="bg-white space-y-3 h-full w-full absolute top-0 right-0 transition-transform duration-500">
              <div className="flex p-4 border-b items-center gap-2">
                <ArrowRight
                  onClick={() => setActiveFilter(null)}
                  className="rotate-180 cursor-pointer"
                  size={18}
                  strokeWidth={1}
                />
                <span className="text-sm">
                  {
                    filterItems.find((item: any) => item.key === activeFilter)
                      ?.label
                  }
                </span>
                {filters[activeFilter]?.length > 0 && (
                  <button
                    onClick={() => clearFilter(activeFilter)}
                    className="text-red-500 underline text-xs ml-auto"
                  >
                    reset
                  </button>
                )}
              </div>

              <div className="px-5 space-y-4">
                {activeFilter === "price" ? (
                  <div className="space-y-2">
                    <DualRangeSlider
                      value={tempValues}
                      onValueChange={setTempValues as any}
                      min={
                        filterItems.find((item: any) => item.key === "price")
                          ?.min || 0
                      }
                      max={
                        filterItems.find((item: any) => item.key === "price")
                          ?.max || 10000
                      }
                      step={1}
                    />
                    <button
                      onClick={() => addFilter("price", tempValues.map(String))}
                      className="bg-templateText text-white text-xs px-4 py-1.5 rounded !mt-4 hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  filterItems
                    .find((item: any) => item.key === activeFilter)
                    ?.list?.map((option: any) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={
                            filters[activeFilter]?.includes(option.value) ||
                            false
                          }
                          onChange={() =>
                            toggleFilter(activeFilter, option.value)
                          }
                          className="hidden"
                        />
                        <span
                          className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                            filters[activeFilter]?.includes(option.value)
                              ? "bg-templateText border-templateText"
                              : "bg-white border-gray-400"
                          }`}
                        >
                          {filters[activeFilter]?.includes(option.value) && (
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
                        <span>
                          {option.label} ({option.count})
                        </span>
                      </label>
                    ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* <div className="pb-4 space-y-4 px-4">
          <hr />
          <div className="flex items-center gap-0">
            <button
              className="bg-templateText h-full w-full text-white text-xs py-3 rounded hover:opacity-90"
              onClick={handleApplyFilters}
            >
              Apply
            </button>
            <span
              className="text-sm block text-gray-800 px-5 cursor-pointer"
              onClick={clearAllFilters}
            >
              Clear
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MobileFilter;
