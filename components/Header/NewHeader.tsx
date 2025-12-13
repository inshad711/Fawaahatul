// E:\hutzdiecast.com-main\components\Header\NewHeader.tsx

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import AnnouncementBarV1 from "./Announcement/Announcement";
import SearchBarComp from "./SearchBarComp";
import MobileNavigation from "./Navigation/MobileNavigation";
import HeaderAccountComp from "./HeaderAccountComp";
import CartDrawer from "./Cart/CartDrawer";
import MobileSearchComp from "./MobileSearchComp";

import { RootState } from "@/store/store";

interface SubItem {
  name: string;
  url: string;
}

interface MenuItem {
  name: string;
  url: string;
  megamenu?: {
    name: string;
    list: SubItem[];
  }[];
  dropdown?: SubItem[];
}

interface Props {
  isHome: boolean;
  headerMenu: MenuItem[];
  logoSettings: {
    logoPath: string;
    altText: string;
  };
  variation: number;
  isScrolled: boolean;
}

const NewHeader: React.FC<Props> = ({
  isHome,
  headerMenu,
  logoSettings,
  variation,
  isScrolled,
}) => {
  const { validated } = useSelector((state: RootState) => state.toggle);
  const pathname = usePathname();

  const [activeMegaMenu, setActiveMegaMenu] = useState<MenuItem | null>(null);
  const [activeDropdownMenu, setActiveDropdownMenu] = useState<MenuItem | null>(
    null
  );

  useEffect(() => {
    setActiveMegaMenu(null);
    setActiveDropdownMenu(null);
  }, [pathname]);

  const handleMenuEnter = (item: MenuItem) => {
    if (item.megamenu) {
      setActiveMegaMenu(item);
      setActiveDropdownMenu(null);
    } else if (item.dropdown) {
      setActiveDropdownMenu(item);
      setActiveMegaMenu(null);
    }
  };

  const clearMenus = () => {
    setActiveMegaMenu(null);
    setActiveDropdownMenu(null);
  };

  // Determine the logo source based on isHome prop
  const logoSrc = isHome
    ? "/assets/perfumeImage/1763018354754-2.webp" // Static logo for home
    : "/assets/perfumeImage/1763018354754-2.webp"; // Logo from props for other pages

  // Determine the alt text
  const logoAlt = isHome
    ? "Home Logo" // Or provide a specific alt text for the home logo
    : "home logo";
  return (
    <div
      className={`
        ${isHome ? "" : "shadow-md"}
        ${
          variation === 1
            ? "relative w-full z-10 bg-transparent"
            : "bg-templateBackground text-white relative z-10"
        }
        transition-all ease-in-out duration-300 text-templateText space-y-2 pt-3 pb-1 w-full 
      `}
    >
      <div className="px-4 md:px-8  lg:px-10 flex items-center justify-between">
        <div className="lg:w-full flex items-center justify-start">
          <SearchBarComp variation={variation} />
          <MobileNavigation variation={variation} headerMenu={headerMenu} />
        </div>

        <div className="lg:w-full flex items-center justify-center">
          <Link href="/">
            <Image
              className="w-full h-[65px] object-contain"
              src={"/assets/perfumeImage/fawaahlogo.webp"}
              alt={logoAlt}
              height={500}
              width={460}
            />
          </Link>
        </div>

        <div className="lg:w-full flex items-center justify-end gap-2.5 lg:gap-6">
          {validated && (
            <div className="hidden lg:block">
              <HeaderAccountComp variation={variation} />
            </div>
          )}
          <CartDrawer variation={variation} />
        </div>
      </div>

      <div className="lg:hidden">
        <MobileSearchComp variation={variation} />
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {(headerMenu || []).map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMenuEnter(item)}
              onMouseLeave={clearMenus}
              className="relative"
            >
              <Link
                href={item.megamenu || item.dropdown ? "#" : item.url}
                className={`
                  py-1 px-2 relative font-medium ${
                    variation === 1
                      ? "text-white hover-class-1"
                      : "text-white hover-class-2"
                  }  text-[15px] flex items-center gap-0.5
                  ${pathname === item.url ? `${variation === 1 ? "" : ""}` : ""}
                  ${
                    activeMegaMenu?.name === item.name ||
                    activeDropdownMenu?.name === item.name
                      ? `${
                          variation === 1 ? "active-class-1" : "active-class-2"
                        }`
                      : ""
                  }
                `}
              >
                {item.name}
                {(item.megamenu || item.dropdown) && (
                  <ChevronDown size={16} className="mt-0.5" strokeWidth={1.5} />
                )}
              </Link>
              <AnimatePresence>
                {activeDropdownMenu?.name === item.name && item.dropdown && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="absolute min-w-[300px] overflow-hidden top-[35px] left-0 bg-white shadow z-40"
                    onMouseLeave={clearMenus}
                  >
                    <div
                      onMouseEnter={() => setActiveDropdownMenu(item)}
                      className=" p-5 gap-4"
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/collections${subItem.url}`}
                          className="text-[#353535] text-sm  block py-1"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Megamenu Dropdown */}
      <AnimatePresence>
        {activeMegaMenu?.megamenu && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border absolute top-[93%] left-0 w-full bg-white z-40"
            onMouseLeave={clearMenus}
          >
            <div
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              className="grid grid-cols-3 templateContainer py-8 gap-8"
            >
              {activeMegaMenu.megamenu.map((menu, idx) => (
                <div key={idx} className="space-y-5">
                  <h3 className="text-lg font-medium text-[#242424]">
                    {menu.name}
                  </h3>
                  <div className="space-y-2">
                    {menu.list.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        href={`/collections${subItem.url}`}
                        className="block text-[#515151] text-sm"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewHeader;
