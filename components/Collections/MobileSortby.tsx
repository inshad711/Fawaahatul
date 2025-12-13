"use client";
import { useHandleSort } from "@/hooks/useHandleSort";
import { sortByList } from "@/utils/constants";
import { ArrowUpDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MobileSortbyProps {}

const MobileSortby: React.FC<MobileSortbyProps> = () => {
  const [showSort, setShowSort] = useState(false);

  const { sort, setSortOption, clearSort } = useHandleSort();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", showSort);
    return () => document.body.classList.remove("no-scroll");
  }, [showSort]);

  const handleSortSelect = (value: string) => {
    setSortOption(value);
    setShowSort(false); // Close drawer after selection
  };

  return (
    <>
      <div
        className="flex items-center gap-1.5 lg:hidden"
        onClick={() => setShowSort(true)}
      >
        <ArrowUpDown size={15} color="gray" />
        <span className="uppercase text-xs font-medium text-gray-500 tracking-wider">
          Sort
        </span>
      </div>

      {/* Overlay */}
      {showSort && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
          onClick={() => setShowSort(false)}
        ></div>
      )}

      {/* Sort Drawer */}
      <div
        className={`fixed space-y-2 bottom-0 left-0 w-full p-4 rounded-t-xl bg-white z-[100] transform transition-transform duration-300 ${
          showSort ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between pt-1 pb-2">
          <span className="uppercase text-gray-800 font-semibold text-sm">
            SORT BY
          </span>
          {sort && (
            <button
              onClick={() => {
                clearSort();
                setShowSort(false);
              }}
              className="text-sm flex items-center gap-1 text-red-500 "
            >
              Clear Sort <X size={15} />
            </button>
          )}
        </div>
        <hr />
        <ul className="space-y-6 px-1 py-2">
          {sortByList?.map((item) => (
            <li
              key={item.value}
              className="flex items-center gap-2 text-sm cursor-pointer"
              onClick={() => handleSortSelect(item.value)}
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileSortby;
