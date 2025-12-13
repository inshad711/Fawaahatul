"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { DualRangeSlider } from "../ui/DualRangeSlider";
import { useHandleFilter } from "@/hooks/useHandleFilter";
import SelectedFilters from "../Collections/SelectedFilters";

interface DesktopFilterProps {
  filterItems: any;
}

const DesktopFilter: React.FC<DesktopFilterProps> = ({ filterItems }) => {
  const [tempValues, setTempValues] = useState<[number, number]>([0, 10000]);

  const { filters, toggleFilter, addFilter, clearFilter } = useHandleFilter();

  // Filter out empty filter sections (except price)
  const validFilterItems = filterItems?.filter((item: any) => {
    if (item.key === "price") return true; // Always include price
    return Array.isArray(item.list) && item.list.length > 0;
  });

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

  return (
    <div className="space-y-6">
      <h2 className="text-sm uppercase tracking-wide font-medium text-templateText ">
        Filter By
      </h2>

      <Accordion
        type="single"
        defaultValue={validFilterItems?.[0]?.key}
        className="w-full space-y-2"
      >
        {validFilterItems?.map((item: any) => (
          <AccordionItem key={item.key} value={item.key} className="border-b">
            <AccordionTrigger className="text-sm text-gray-800 justify-between">
              {item.label}
              {filters[item.key]?.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accordion toggle
                    clearFilter(item.key);
                  }}
                  className="text-red-500 underline text-xs ml-auto pr-2"
                >
                  reset
                </button>
              )}
            </AccordionTrigger>
            <AccordionContent className="px-2 py-4 space-y-2">
              {item.key === "price" ? (
                <div className="space-y-3">
                  <DualRangeSlider
                    value={tempValues}
                    onValueChange={setTempValues as any}
                    min={
                      filterItems.find((item: any) => item.key === "price")
                        ?.min || 0
                    }
                    max={
                      filterItems.find((item: any) => item.key === "price")
                        ?.max || 100000
                    }
                    step={1}
                  />
                  <button
                    onClick={() => addFilter("price", tempValues.map(String))}
                    className="bg-templateText text-white text-xs px-4 py-1.5 rounded mt-2 hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                item.list?.map((option: any) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters[item.key]?.includes(option.value) || false
                      }
                      onChange={() => toggleFilter(item.key, option.value)}
                      className="hidden"
                    />
                    <span
                      className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                        filters[item.key]?.includes(option.value)
                          ? "bg-templateText border-templateText"
                          : "bg-white border-gray-400"
                      }`}
                    >
                      {filters[item.key]?.includes(option.value) && (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DesktopFilter;
