"use client";
import React from "react";
import DesktopFilter from "./DesktopFilter";

const SidebarHeader = ({ filterItems }: { filterItems: any[] }) => {
  return <DesktopFilter filterItems={filterItems} />;
};

export default SidebarHeader;
