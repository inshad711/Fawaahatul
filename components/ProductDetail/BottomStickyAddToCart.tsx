"use client";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import ATC from "../FunctionalButtons/ATC";
import NotifyMe from "../Button/NotifyMe";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import ImageWithFallback from "../Image/Fallbackimage";
interface Props {
  data: {
    id: number;
    name: string;
    slug: string;
    gallery: { url: string; alt: string }[];
    regularPrice: number;
    sellingPrice: number;
    isVariantProduct: boolean;
    variants: {}[];
    combination?: any;
  };
  dark: boolean;
  disabled: boolean;
}

const BottomStickyAddToCart: React.FC<Props> = ({ data, dark, disabled }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formatAmount } = useFormatAmount();
  // console.log(data.gallery.length);

  // Debounce scroll event for better performance
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      toggleVisibility();
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleVisibility]);

  return (
    <div
      className={`py-3 bg-templateBackground w-full fixed left-0 border-t text-templateText bottom-0 z-[1] transition-transform duration-700 ease-in-out shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
        ${isVisible ? "translate-y-0" : "translate-y-52"} 
        hidden md:block`} // Hide on mobile
    >
      <div className="templateContainer flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-[65px] w-[55px]">
            {data.gallery.length > 0 ? (
              <ImageWithFallback
                src={`${process.env.BACKBLAZE_URL}/${data?.gallery[0].url}`}
                alt={data?.gallery[0].alt || "Product Image"}
                sizes="50px"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                height={65}
                width={55}
              />
            ) : (
              <Image
                src={"/assets/placeholders/productPlaceholder.webp"}
                alt={"placeholders"}
                sizes="50px"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                height={65}
                width={55}
              />
            )}
          </div>
          <div>
            <h2 className="text-[16px] w-full line-clamp-1 group-hover:text-templatePrimary tracking-wider">
              {data?.name}
            </h2>
            <div className="flex gap-2 items-center">
              <span className="text-lg tracking-wider">
                {formatAmount(Number(data?.sellingPrice))}
              </span>
              <span className="text-[0.7rem] mt-1 line-through text-gray-500 tracking-wide">
                {formatAmount(Number(data?.regularPrice))}
              </span>
            </div>
          </div>
        </div>
        {disabled ? (
          <NotifyMe productId={data?.id} />
        ) : (
          <div className="w-1/2 md:w-[250px]">
            <ATC productData={data} dark={true} disabled={disabled} />
          </div>
        )}
        {/* <button className="flex items-center gap-2 border border-templateBlack bg-templateBlack hover:opacity-90 py-3 px-10 text-sm text-white font-medium">
          <ShoppingBag size={18} strokeWidth={1.5} /> ADD TO BAG
        </button> */}
      </div>
    </div>
  );
};

export default BottomStickyAddToCart;
