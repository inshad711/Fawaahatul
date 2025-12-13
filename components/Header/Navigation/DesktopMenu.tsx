"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Props {
  toggled?: boolean;
  reachedTop?: boolean;
  headerMenu?: any;
}

const DesktopMenu: React.FC<Props> = ({ toggled, reachedTop, headerMenu }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-1 flex-wrap">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {headerMenu?.map((item: any, index: number) => (
            <Link
              key={index}
              href={`${item.url}`}
              className="py-1 flex items-center text-[#242424] uppercase gap-0.5 px-2 hover-class text-sm"
            >
              {item.name}
              {(item.megamenu || item.dropdown) && (
                <ChevronDown size={16} className="mt-0.5" strokeWidth={1.5} />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-"></div>
    </>
  );
};

export default DesktopMenu;
