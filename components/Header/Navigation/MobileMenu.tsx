"use client";
import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu } from "@/store/slice/togglesSlice";

interface MenuItem {
  name: string;
  url?: string;
  megamenu?: {
    name: string;
    list: { name: string; url: string }[];
  }[];
  dropdown?: { name: string; url: string }[];
}

interface Props {
  headerMenu: MenuItem[];
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<Props> = ({ headerMenu, toggleMobileMenu }) => {
  const { openMenu } = useSelector((state: RootState) => state.toggle);
  const dispatch = useDispatch();
  return (
    <div className="px-4 py-2 text-sm">
      <Accordion type="single" collapsible className="w-full">
        {headerMenu?.map((item, index) => {
          const isNormal = !item.megamenu && !item.dropdown;

          if (isNormal) {
            return (
              <Link
                key={index}
                onClick={() => dispatch(setOpenMenu(false))}
                href={`${item.url}`}
                className="block border-b py-4 last:border-none"
              >
                {item.name}
              </Link>
            );
          }

          return (
            <AccordionItem key={index} value={item.name}>
              <AccordionTrigger>
                <span className="font-light tracking-wide">{item.name}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                {/* Megamenu content */}
                {item.megamenu && (
                  <Accordion type="single" collapsible className="w-full">
                    {item.megamenu.map((category, catIndex) => (
                      <AccordionItem key={catIndex} value={category.name}>
                        <AccordionTrigger>
                          <span className="font-light tracking-wide">
                            {category.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-2">
                          {category.list.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              onClick={() => dispatch(setOpenMenu(false))}
                              href={`/collections/${subItem.url}`}
                              className="block border-b py-4 last:border-none"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {/* Dropdown content */}
                {item.dropdown?.map((dropdownItem, dropIndex) => (
                  <Link
                    key={dropIndex}
                    onClick={() => dispatch(setOpenMenu(false))}
                    href={`/collections/${dropdownItem.url}`}
                    className="block border-b py-4 last:border-none"
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MobileMenu;
