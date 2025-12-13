"use client";
import React, { useState, useEffect } from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import Link from "next/link";

const DummyProductCard = () => {
  const [timer, setTimer] = useState(100);
  const images = [
    "https://www.fridaycharm.com/cdn/shop/files/coca_2_1800x1800.jpg?v=1738848683",
    "https://www.fridaycharm.com/cdn/shop/files/coca1_cb24be95-a98f-4990-b938-24da9d37fbb9_1800x1800.jpg?v=1738849167",
    "https://www.fridaycharm.com/cdn/shop/files/COCA_3_1800x1800.jpg?v=1738848690",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        timer === 100 && setTimer(1500);
      }, timer);
    } else {
      setTimer(100);
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, timer]);

  return (
    <Link href="/product/product_slug" className="block space-y-2">
      <div
        className="relative aspect-[4/4.5] overflow-hidden"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <ImageWithFallback
              key={index}
              src={src}
              alt={`Product Image`}
              sizes="100vw"
              priority
              className="h-full w-full object-cover flex-shrink-0"
              height={500}
              width={500}
            />
          ))}
        </div>
        {isHovered && (
          <div className="absolute bg-white h-4 bottom-0 left-0 w-full flex gap-1 items-center justify-center p-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-[6px] w-[6px] rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#680116] scale-125"
                    : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default DummyProductCard;
