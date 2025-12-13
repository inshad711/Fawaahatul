"use client";
import { ArrowDownAZ, ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sortby = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortByList = [
    {
      label: "Featured",
      value: "featured",
    },
    {
      label: "Best Selling",
      value: "best_selling",
    },
    {
      label: "Price, low to high",
      value: "price_low_to_high",
    },
    {
      label: "Price, high to low",
      value: "price_high_to_low",
    },
    {
      label: "Alphabetically, A - Z",
      value: "alphabetically_a_to_z",
    },
    {
      label: "Alphabetically, Z - A",
      value: "alphabetically_z_to_a",
    },
    {
      label: "Date: New to Old",
      value: "date_new_to_old",
    },
    {
      label: "Date: Old to New",
      value: "date_old_to_new",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="w-[230px] relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-sm tracking-wide bg-white border border-templateText text-templateText py-2 flex items-center justify-between px-6 cursor-pointer relative gap-10"
        >
          <span className="flex items-center gap-2">
            <ArrowDownAZ size={16} strokeWidth={1.5} />
            <span>Sort by</span>
          </span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </button>

        <div
          className={`${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "translate-y-3 opacity-0 invisible"
          } bg-white w-full border absolute transition-all ease-in-out duration-300 left-0 top-full`}
        >
          {sortByList.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={index}
              className="text-xs tracking-wide px-4 py-2.5 hover:bg-gray-100 cursor-pointer"
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>

      {sortBy && (
        <button className="flex items-center underline text-sm hover:bg-gray-100 px-3 py-1.5 rounded-md gap-1">
          Clear <X size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default Sortby;
