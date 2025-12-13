import { useHandleFilter } from "@/hooks/useHandleFilter";
import { X } from "lucide-react";
import React from "react";

const SelectedFilters = () => {
  const { filters, clearFilter } = useHandleFilter();

  const formatFilterValue = (value: string) => {
    return value
      .replace(/[_-]+/g, " ") // replace underscores/dashes with space
      .trim() // remove extra spaces
      .replace(/\s+/g, " ") // ensure single space between words
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  };

  if (Object.keys(filters).length === 0) {
    return null; // No filters applied
  }

  return (
    <div className="py-2">
      <div className="flex items-center text-[11px] gap-1 md:gap-1.5 flex-wrap">
        {Object.entries(filters).map(([key, value]) => {
          if (key === "price" && Array.isArray(value) && value.length === 2) {
            return (
              <button
                key={key}
                onClick={() => clearFilter(key)} // remove whole price filter
                className="bg-templateText transition-all duration-150 active:scale-90 hover:opacity-90 tracking-wide cursor-pointer flex items-center gap-2 text-white px-4 py-2 rounded-full"
              >
                {`${value[0]} - ${value[1]}`}
                <X size={18} className="h-3.5 w-3.5 mb-0.5" />
              </button>
            );
          }

          return (Array.isArray(value) ? value : [value]).map((item, index) => (
            <button
              key={`${key}-${item}-${index}`}
              onClick={() => clearFilter(key)} // remove individual
              className="bg-templateText  capitalize transition-all duration-150 active:scale-90 hover:opacity-90 tracking-wide cursor-pointer flex items-center gap-1 md:gap-1.5 text-white px-4 md:px-4 py-1.5 md:py-2 rounded-full"
            >
              {formatFilterValue(item)}
              <X className="h-3.5 w-3.5  lg:mb-0.5" />
            </button>
          ));
        })}
      </div>
    </div>
  );
};

export default SelectedFilters;
