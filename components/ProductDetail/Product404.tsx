"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Product404 = () => {
  const path = usePathname();
  const popularSearches = [
    "Perfume",
    "Soap",
    "Body Spray",
    "Shampoo",
    "Hair Removal",
    "Shower Gel",
  ];
  return (
    <div className="templateContainer pt-6 lg:pt-10 pb-20 text-center space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm">You searched for</h3>
        <p className="text-templateRed underline">{path.replace("/", " ")}</p>
      </div>
      <div className="space-y-2">
        <Image
          src={"/assets/placeholders/emptycart.webp"}
          alt="Product Image"
          className="h-40 w-auto object-contain mx-auto"
          height={500}
          width={500}
        />
        <h1 className="text-xl lg:text-3xl tracking-wide">
          We couldn't find any matches!
        </h1>
        <p className="text-xs lg:text-sm text-gray-500 tracking-wide">
          Please check the spelling or try searching something else
        </p>
      </div>
      {/* <div className="h-[1px] bg-gray-300 max-w-lg mx-auto"></div>
      <div className="space-y-4">
        <h2 className="tracking-wide underline text-base lg:text-lg">
          Popular Searches
        </h2>
        <div className="flex text-xs flex-wrap gap-2 max-w-md mx-auto justify-center">
          {popularSearches.map((item, index) => (
            <button key={index}>
              <Link
                href={"/collections/" + item.toLowerCase()}
                className="px-4 lg:px-6 text-xs tracking-wide rounded-full bg-white border border-templateBlack text-templateText py-1.5 lg:py-2 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100  before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-templateText before:to-templateBlack before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:text-white hover:before:left-0"
              >
                {item}
              </Link>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Product404;
