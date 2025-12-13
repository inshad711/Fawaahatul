"use client";
import React from "react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

interface Props {
  logoSettings: any;
  headerMenu: any;
}

const FooterWrapper: React.FC<Props> = ({ logoSettings, headerMenu }) => {
  const pathname = usePathname();
  if (
    pathname.includes("checkout") ||
    pathname.includes("thank-you") ||
    pathname.includes("testing-page-for-developers-only")
  ) {
    return null;
  }
  return <Footer logoSettings={logoSettings} headerMenu={headerMenu} />;
};

export default FooterWrapper;
