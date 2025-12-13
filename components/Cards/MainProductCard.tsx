// E:\hutzdiecast.com-main\components\Cards\MainProductCard.tsx
"use client";
import React, { useState, useEffect } from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { calculateDiscount } from "@/utils/constants";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { BadgeCheck, Check, Expand, Star } from "lucide-react";
import CardQuickView from "../Quickview/CardQuickView";
import ATC from "../FunctionalButtons/ATC";
import { formatCount } from "@/lib/utils";
import AddToWishlist from "../Wishlist/AddToWishlist";
import LinkButton from "../Button/LinkButton";
import { useFormatAmount } from "@/hooks/useFormatAmount";

interface Props {
  data: {
    id: number;
    name: string;
    brandName: string;
    slug: string;
    sellingPrice: number;
    available: number;
    isVariantProduct: boolean;
    regularPrice: number;
    isInWishlist: boolean;
    tag: string;
    stock?: number;
    variants: {}[];
    ratingStar: number;
    noOfReviews: number;
    isInCart: boolean;
    showRange: {
      min: number;
      max: number;
    };
    gallery: {
      alt: string;
      url: string;
    }[];
  };
}

const MainProductCard: React.FC<Props> = ({ data }) => {
  const { formatAmount } = useFormatAmount();
  const [timer, setTimer] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.gallery?.length);
        timer === 100 && setTimer(1500);
      }, timer);
    } else {
      setTimer(100);
      setCurrentIndex(0); // Reset to first image on mouse leave
    }

    return () => clearInterval(interval);
  }, [isHovered, timer]);

  const outOfStock = Boolean(data?.stock !== undefined && data?.stock <= 0);

  const saved = data?.regularPrice - data?.sellingPrice;

  return (
    <div className="relative group h-full flex flex-col justify-between">
      {/* {JSON.stringify(data?.gallery[0].url)} */}
      <Link href={`/products/${data?.slug}`} className="block space-y-2">
        {/* {JSON.stringify(data?.stock)} */}
        <div
          className="relative group pointer-events-none bg-gray-100 lg:pointer-events-auto  aspect-[4/5] overflow-hidden"
          onMouseEnter={() => data?.gallery?.length > 1 && setIsHovered(true)}
          onMouseLeave={() => data?.gallery?.length > 1 && setIsHovered(false)}
        >
          <div
            className="flex h-full w-full bg-gray-100 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data?.gallery?.map((src, index) => (
              <ImageWithFallback
                key={index}
                src={`${process.env.BACKBLAZE_URL}/${src?.url}`}
                // src={
                //   src?.url?.startsWith("https")
                //     ? src?.url
                //     : `${process.env.BACKBLAZE_URL}/${src?.url}`
                // }
                alt={src?.alt || "Product Image"}
                className="h-full w-full object-cover flex-shrink-0"
                height={400}
                width={200}
              />
            ))}
          </div>

          {/* {JSON.stringify(data.gallery)} */}
          {/* <div className="hidden group-hover:block absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}

          {/* Pagination Dots */}
          {isHovered && (
            <div className="absolute bg-white h-4 bottom-0 left-0 w-full flex gap-1 items-center justify-center p-1">
              {data?.gallery?.map((_, index) => (
                <span
                  key={index}
                  className={`h-[6px] w-[6px] rounded-full transition-all duration-300 ${currentIndex === index
                    ? "bg-[#680116] scale-125"
                    : "bg-gray-300"
                    }`}
                ></span>
              ))}
            </div>
          )}

          {outOfStock && (
            <div className="absolute left-2 top-2">
              <span className="bg-red-600  p-1 lg:p-1.5 text-[0.5rem] lg:text-[0.65rem] rounded-sm lg:font-semibold tracking-wider text-white">
                Sold Out
              </span>
            </div>
          )}

          {data?.tag && (
            <div className=" absolute left-2  top-2 ">
              <span className="bg-[#D8A274]  p-1.5 md:p-2 text-[0.5rem] md:text-[0.65rem] lg:font-medium tracking-wider text-white">
                {data.tag}
              </span>
            </div>
          )}
          {/* {!data?.isVariantProduct &&
            calculateDiscount(data?.regularPrice, data?.sellingPrice) > 0 && (
              <div className="absolute right-0 bottom-1">
                <span className="bg-green-600 p-1.5 md:p-2 text-[0.5rem] md:text-[0.7rem] lg:font-semibold tracking-wider text-white">
                  {calculateDiscount(data?.regularPrice, data?.sellingPrice)}%
                  OFF
                </span>
              </div>
            )} */}
        </div>

        <div>
          <div
            className={`bg-white h-3 hidden lg:flex pointer-events-none lg:pointer-events-auto transition-all ease-in-out duration-200  w-full  gap-1 items-center justify-center p-1 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            {data?.gallery?.map((_, index) => (
              <span
                key={index}
                className={`h-[5px] w-[5px] rounded-full transition-all duration-300 ${currentIndex === index
                  ? "bg-templateRed scale-125"
                  : "bg-gray-300"
                  }`}
              ></span>
            ))}
          </div>

          {/* {data?.brandName && ( */}
          {/* <span className="text-gray-500 mb-[2px] tracking-wider text-[11.5px] font-semibold uppercase block">
            Hotwheels
          </span> */}
          {/* )} */}

          <h2 className="font-medium text-white mb-1 lg:mb-1.5 leading-snug text-xs md:text-sm break-words">
            {data?.name}
          </h2>

          {saved > 0 && (
            <span className="text-green-600 block text-[11px] md:text-[11px] font-semibold tracking-wide">
              Save Rs {formatAmount(saved)}
            </span>
          )}
        </div>

        {data?.ratingStar && data?.noOfReviews ? (
          <div className="flex items-center gap-2 text-templateDark">
            {data?.ratingStar > 0 ? (
              <>
                <div className="flex items-center gap-1">
                  <Star fill="#FFB503" color="#FFB503" size={14} />
                  <span className="text-[11px] md:text-xs text-templateText">
                    {data?.ratingStar?.toFixed(1)}
                  </span>
                </div>
                <div className="h-4 w-[1px] bg-gray-400"></div>
              </>
            ) : null}
            {data?.noOfReviews > 0 ? (
              <div className="flex items-center gap-1">
                <BadgeCheck fill="#156BFF" color="white" size={14} />
                <span className="text-[11px] md:text-xs text-templateText">
                  ({formatCount(data?.noOfReviews)} Reviews)
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          {data?.isVariantProduct ? (
            <>
              {data?.showRange?.min === data?.showRange?.max ? (
                <>
                  <span className="tracking-wider  text-[11px] font-normal md:text-sm  text-gray-700">
                    Starts from
                  </span>{" "}
                  <span className="tracking-wider font-sans font-medium text-sm md:text-sm text-gray-700">
                    {formatAmount(data?.showRange?.min)}
                  </span>
                </>
              ) : (
                <div className="flex gap-2 font-sans items-center">
                  <span className="tracking-wider text-sm md:text-base font-bold text-gray-700">
                    {formatAmount(data?.showRange?.min)}
                  </span>
                  <span>-</span>
                  <span className="tracking-wider text-sm md:text-base font-bold text-gray-700">
                    {formatAmount(data?.showRange?.max)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-2 font-sans items-center">
              <span className="tracking-wider text-sm md:text-sm font-medium text-[#242424]">
                {formatAmount(data?.sellingPrice)}
              </span>
              {data?.regularPrice > 0 && (
                <span className="text-[0.7rem] md:text-xs line-through text-gray-500 tracking-wide">
                  {formatAmount(data?.regularPrice)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {!data?.isVariantProduct && (
        <div className="absolute right-2 top-2">
          <AddToWishlist isInWishlist={data?.isInWishlist} itemId={data?.id} />
        </div>
      )}

      {/* QUICK VIEW */}
      <div className="hidden pointer-events-none space-y-1 transition-all ease-in-out duration-300 lg:pointer-events-auto w-full lg:group-hover:block absolute top-1/2 -translate-y-1/2 text-sm left-0 z-[0]">
        <CardQuickView slug={data?.slug} />
        {data?.isVariantProduct ? (
          <div className="  flex items-center justify-center w-full">
            <button className="relative overflow-hidden">
              <Link
                href={"/products/" + data?.slug}
                className="px-5 cursor-pointer hover:scale-90 text-xs duration-300 transition-all ease-in-out tracking-wide flex items-center gap-1.5 py-2 bg-templateBackground text-templateText rounded-full"
              >
                Choose Option
              </Link>
            </button>
          </div>
        ) : (
          <div className="mt-2.5">
            {data?.isInCart ? (
              <div className=" flex items-center justify-center w-full">
                <div className="px-5 cursor-pointer text-xs hover:scale-90 duration-300 transition-all ease-in-out tracking-wide flex items-center gap-2 py-2 bg-black text-white rounded-full">
                  <Check color="white" size={18} /> In cart
                </div>
              </div>
            ) : (
              <div className=" flex items-center justify-center w-full">
                <ATC
                  floating={true}
                  productData={data}
                  dark={true}
                  disabled={outOfStock}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainProductCard;
