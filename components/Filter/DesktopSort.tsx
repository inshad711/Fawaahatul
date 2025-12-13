import { useHandleSort } from "@/hooks/useHandleSort";
import { sortByList } from "@/utils/constants";
import { ArrowDownAZ, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const DesktopSort = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { sort, setSortOption, clearSort } = useHandleSort();
  const toggleSortDropdown = () => {
    setIsSortOpen((prev) => !prev);
  };
  const selectedSortLabel =
    sortByList.find((item) => item.value === sort)?.label || "Sort by";
  return (
    <div className="w-[250px] relative">
      <button
        onClick={toggleSortDropdown}
        className="w-full text-sm tracking-wide bg-white border border-templateText text-templateText py-2.5 flex items-center justify-between px-6 cursor-pointer relative gap-10"
      >
        <span className="flex items-center gap-2">
          <ArrowDownAZ size={16} strokeWidth={1.5} />
          <span className="text-xs">{selectedSortLabel}</span>
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
  );
};

export default DesktopSort;
