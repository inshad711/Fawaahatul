"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./Style.css";
import MainProductCard from "../../Cards/MainProductCard";
import CartProductCard from "@/components/Cards/CartProductCard";
import LinkButton from "@/components/Button/LinkButton";

type PropType = {
  showCartCard?: boolean;
  options?: EmblaOptionsType;
  productCardData: any[];
  loading: boolean;
};

const SlidesPerView: React.FC<PropType> = ({
  showCartCard,
  options,
  productCardData,
  loading,
}) => {
  const [emblaRef] = useEmblaCarousel({
    containScroll: "trimSnaps",
    ...options,
  });

  return (
    <section className="spvembla">
      <div className="spvembla__viewport" ref={emblaRef}>
        <div className="spvembla__container">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div className="spvembla__slide" key={index}>
                <div className="space-y-2">
                  <div className="aspect-[4/4.5] bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {productCardData?.map((item, index) => (
                <div
                  data-aos="fade-up"
                  // data-aos-delay={index * 100}
                  className="spvembla__slide mb-1"
                  key={index}
                >
                  {showCartCard ? (
                    <CartProductCard data={item} />
                  ) : (
                    <MainProductCard data={item} />
                  )}
                </div>
              ))}
              {!showCartCard && (
                <div className="min-h-full px-2  py-1">
                  <div className="h-full  w-32 flex items-center justify-center">
                    <LinkButton link={"/collections"} text="View all" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SlidesPerView;
