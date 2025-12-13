"use client";
import ImageWithFallback from "@/components/Image/Fallbackimage";
import { X } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { RiMenu4Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setOpenMenu } from "@/store/slice/togglesSlice";

interface Props {
  headerMenu?: any;
  text?: string;
  variation?: number;
}

const MobileNavigation: React.FC<Props> = ({ headerMenu, text, variation }) => {
  const dispatch = useDispatch();
  const { openMenu } = useSelector((state: RootState) => state.toggle);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );

  useEffect(() => {
    setIsMobileMenuOpen(openMenu);
  }, [openMenu]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to add/remove no-scroll class on the body when search is opened/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up the class when the component is unmounted or search is closed
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        onClick={() => dispatch(setOpenMenu(true))}
        className={`lg:hidden grid gap-1 place-content-center place-items-center`}
      >
        <RiMenu4Fill size={20} color={variation === 1 ? "#fff" : "#000"} />
        {text && (
          <span className="text-xs leading-none tracking-wider">{text}</span>
        )}
      </div>
      {/* <div className="lg:hidden text-text" onClick={toggleMobileMenu}>
        <Menu className="text-text" />
      </div> */}
      <div
        className={` fixed top-0 left-0 h-screen overflow-y-auto w-[85%] md:w-[400px] !mt-0 bg-background  !z-[999] transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between shadow-md px-4 py-2">
          <ImageWithFallback
            className="h-auto w-[100px] logotransbg object-contain"
            src={`${process.env.BACKEND}/upload/WebsiteLogos/${globalSetting?.logoSettings?.logoPath}`}
            alt={`${process.env.STORE_NAME}` || "Logo"}
            sizes={"100vw"}
            height={500}
            width={500}
          />

          <X
            onClick={() => dispatch(setOpenMenu(false))}
            size={25}
            strokeWidth={1}
            className="text-templateText"
          />
        </div>
        <Suspense>
          <MobileMenu
            toggleMobileMenu={toggleMobileMenu}
            headerMenu={headerMenu}
          />
        </Suspense>
      </div>
      {/* Overlay for closing mobile menu */}
      {openMenu && (
        <div
          onClick={() => dispatch(setOpenMenu(false))}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default MobileNavigation;
