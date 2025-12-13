import React from "react";
import SearchBarComp from "./SearchBarComp";
import ImageWithFallback from "../Image/Fallbackimage";
import MobileSearchComp from "./MobileSearchComp";
import HeaderAccountComp from "./HeaderAccountComp";
import Link from "next/link";
import DesktopMenu from "./Navigation/DesktopMenu";
import CartDrawer from "./Cart/CartDrawer";
import MobileNavigation from "./Navigation/MobileNavigation";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header = () => {
  const { validated } = useSelector((state: RootState) => state.toggle);

  return (
    <>
      {/* <div className="h-auto w-full border-b  bg-background pt-2 pb-1 space-y-3">
        <div className="templateContainer w-full flex items-center  lg:items-center justify-between ">
          <div className="lg:w-full h-full flex items-center justify-start ">
            {validated ? (
              <SearchBarComp />
            ) : (
              <div className="hidden lg:block w-[200px] h-8 bg-gray-100 rounded-md animate-pulse"></div>
            )}
            <MobileNavigation />
          </div>
          <div className="lg:w-full flex items-center justify-center ">
            <Link href={"/"}>
              <ImageWithFallback
                className="h-auto w-[180px] lg:w-[220px] object-contain"
                src={"/assets/logos/logotransbg.png"}
                alt={`${process.env.STORE_NAME}`}
                sizes={"100vw"}
                height={4}
                width={16}
              />
            </Link>
          </div>
          <div className="lg:w-full flex items-center justify-end gap-2.5 lg:gap-6 ">
            <div className="hidden lg:block">
              {validated ? (
                <HeaderAccountComp />
              ) : (
                <div className="w-[80px] h-8 bg-gray-100 rounded-md animate-pulse"></div>
              )}
            </div>
            <CartDrawer />
          </div>
        </div>
        <div className="lg:hidden">
          <MobileSearchComp />
        </div>
        <div className="hidden lg:block">
          <DesktopMenu />
        </div>
      </div> */}
    </>
  );
};

export default Header;
