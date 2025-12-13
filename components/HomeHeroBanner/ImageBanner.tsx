"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Image from "next/image";

type PropType = {
  options?: EmblaOptionsType;
  height: string;
  banners: any;
};

const ImageBanner: React.FC<PropType> = ({ height, banners, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex ml-[-1rem] touch-pan-y">
        {banners?.map((item: any, index: any) => (
          <div
            key={index}
            style={{ height: `${height}px` }}
            className="flex-none pl-4 h-full w-full"
          >
            {item.link === "" ? (
              <Image
                className="block w-full h-full object-cover select-none"
                src={item.path}
                height={1000}
                width={1600}
                priority
                alt={`${item.alt}` || "Banner Image"}
                sizes="100vw"
              />
            ) : (
              <a
                target="_blank"
                href={item.link}
                className="block w-full h-full"
              >
                <Image
                  className="block w-full h-full object-cover select-none"
                  src={item.path}
                  height={1000}
                  width={1600}
                  priority
                  alt={`${item.alt}` || "Banner Image"}
                  sizes="100vw"
                />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBanner;
