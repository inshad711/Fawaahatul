"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import MobileGallery from "./ThumbnailGallery/MobileGallery";
import ImageWithFallback from "../Image/Fallbackimage";
import { ChevronLeft, MoveLeft, MoveRight } from "lucide-react";

const OPTIONS: EmblaOptionsType = {};

interface Props {
  gallery: {
    url: string;
    alt: string;
  }[];
}

const ProductGallery: React.FC<Props> = ({ gallery }) => {
  const [open, setOpen] = useState<any | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const maxTranslateY = 140; // Max movement limit

  const handleDoubleClick = () => {
    setIsZoomed((prev) => !prev);
    setTranslateY(0); // Reset position when toggling zoom
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
    setTranslateY(0);
  };

  const handleClick = (item: any) => {
    setOpen(item);
  };

  const prevImage = () => {
    if (open) {
      const currentIndex = gallery.findIndex((item) => item.url === open.url);
      const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
      setOpen(gallery[prevIndex]);
      setIsZoomed(false);
      setTranslateY(0);
    }
  };

  const nextImage = () => {
    if (open) {
      const currentIndex = gallery.findIndex((item) => item.url === open.url);
      const nextIndex = (currentIndex + 1) % gallery.length;
      setOpen(gallery[nextIndex]);
      setIsZoomed(false);
      setTranslateY(0);
    }
  };

  const handleScroll = (event: React.WheelEvent) => {
    if (isZoomed) {
      setTranslateY((prev) => {
        const newTranslateY = prev - event.deltaY * 2;
        return Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));
      });
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsZoomed(false); // Reset zoom
      setTranslateY(0); // Reset scroll position
    }
  }, [open]);

  return (
    <>
      <div className="hidden md:grid w-full  lg:grid-cols-2 gap-3">
        {gallery.length > 0 ? (
          <>
            {gallery.map((item, index) => {
              const isVideo = /\.(mp4|webm|ogg)$/i.test(item.url);
              return (
                <div
                  key={index}
                  onClick={!isVideo ? () => handleClick(item) : undefined}
                  className={`${
                    gallery.length === 1
                      ? "h-full w-full col-span-2"
                      : "h-full w-full col-span-1"
                  } overflow-hidden`}
                >
                  {isVideo ? (
                    <video
                      src={
                        item.url
                          ? `${process.env.BACKBLAZE_URL}/${item.url}`
                          : "/assets/placeholder/productPlaceholder.webp"
                      }
                      className="h-full w-full object-cover object-center"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <ImageWithFallback
                      src={`${process.env.BACKBLAZE_URL}/${item.url}`}
                      height={1000}
                      width={1000}
                      alt={item?.alt || "Product Image"}
                      className="h-full w-full cursor-zoom-in object-cover transition-all duration-500 hover:scale-105"
                    />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <Image
              src={"/assets/placeholders/productPlaceholder.webp"}
              alt="Product Image"
              className="aspect-[4/5.3] object-cover col-span-1 h-full w-full"
              height={800}
              width={800}
            />
            <Image
              src={"/assets/placeholders/productPlaceholder.webp"}
              alt="Product Image"
              className="aspect-[4/5.3] object-cover col-span-1 h-full w-full"
              height={800}
              width={800}
            />
          </>
        )}
      </div>

      <div className="md:hidden">
        <MobileGallery options={OPTIONS} gallery={gallery} />
      </div>

      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed cursor-pointer inset-0 z-50 bg-black/50"
        ></div>
      )}

      {open && (
        <div
          className="p-4 fixed z-50 top-3 hover:scale-110  transition-all ease-in-out duration-300 right-3 group flex items-center justify-center rounded-full bg-white cursor-pointer"
          onClick={() => setOpen(null)}
        >
          <div className="relative h-5 w-5 ">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/80 rotate-45"></div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/80 -rotate-45"></div>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-white h-[80%] lg:h-screen my-auto templateContainer w-[90%] mx-auto z-[9999999] flex items-center justify-center">
          <div
            ref={imageContainerRef}
            className={`relative w-full  h-full overflow-hidden flex items-center justify-center`}
            onWheel={handleScroll}
          >
            <ImageWithFallback
              src={`${process.env.BACKBLAZE_URL}/${open.url}`}
              height={1000}
              sizes="100vw"
              draggable
              width={1000}
              alt={open?.alt || "Product Image"}
              className={`object-cover lg:object-contain h-full w-auto  transition-transform duration-300 ${
                isZoomed ? "customScrollCursor" : "customZoomCursor"
              } `}
              onDoubleClick={handleDoubleClick}
              style={{
                transform: `scale(${
                  isZoomed ? 2 : 1
                }) translateY(${translateY}px)`,
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          <div className="absolute top-3 left-3 space-y-2">
            {gallery.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className={`h-14 bg-white rounded border ${
                  item.url === open.url && "border-templateRed"
                } w-14 overflow-hidden`}
              >
                <ImageWithFallback
                  onClick={handleZoomOut}
                  src={`${process.env.BACKBLAZE_URL}/${item.url}`}
                  height={1000}
                  width={1000}
                  alt={item?.alt || "Product Image"}
                  className="h-full w-full cursor-pointer object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {gallery.length >= 2 && (
            <div
              onClick={prevImage}
              className="cursor-pointer absolute top-1/2 z-50 -translate-y-1/2 left-5"
            >
              <MoveLeft size={30} strokeWidth={1} />
            </div>
          )}

          {gallery.length >= 2 && (
            <div
              onClick={nextImage}
              className="cursor-pointer absolute top-1/2 z-50 -translate-y-1/2 right-5"
            >
              <MoveRight size={30} strokeWidth={1} />
            </div>
          )}

          <div className="hidden select-none md:block absolute bg-white/80 px-4 py-2 rounded-full top-4 text-sm tracking-wide left-1/2 -translate-x-1/2">
            {isZoomed
              ? "Double tap to zoom out image"
              : " Double tab to zoom in image"}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
