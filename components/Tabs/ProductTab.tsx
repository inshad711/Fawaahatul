"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import SlidesPerView from "../Embla/SlidesPerView/SlidesPerView";
import LinkButton from "../Button/LinkButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  loading: boolean;
  products: any;
}

const ProductTab: React.FC<Props> = ({ loading, products }) => {
  const data = [
    {
      tab: "FOR GIFTING",
      content: [1, 2, 3, 4],
      key: "best-sellers",
      link: "/best-sellers",
    },
    // {
    //   tab: "New Arrivals",
    //   content: [1, 2],
    //   key: "new-arrivals",
    //   link: "/new-arrivals",
    // },
  ];

  // Set initial state to the first tab object
  const [activeTab, setActiveTab] = useState(data[0]);

  const OPTIONS: EmblaOptionsType = { align: "start" };

  const handleTabSwitch = (item: {
    tab: string;
    content: number[];
    key: string;
    link: string;
  }) => {
    setActiveTab(item);
  };

  if (products?.length < 1) return null;

  return (
    <div
      data-aos="fade-up"
      className="templateContainer py-6 md:py-8 lg:py-12 w-full"
    >
      <div className="flex items-center justify-center gap-5">
        {data?.map((item, index) => (
          <div
            className="flex items-center justify-center gap-5"
            key={item.key}
          >
            <span
              onClick={() => handleTabSwitch(item)}
              className={`sectionHeading ${
                activeTab.key === item.key ? "opacity-100" : "opacity-30"
              }`}
            >
              {item.tab}
            </span>
            {index + 1 < data.length && (
              <div className="h-8 w-[1px] bg-templateText"></div>
            )}
          </div>
        ))}
      </div>
      {/* Tab Content */}
      <div className="w-full mt-8 mb-2 space-y-10">
        <SlidesPerView
          showCartCard={false}
          options={OPTIONS}
          productCardData={products}
          loading={loading}
        />
        {/* View All Button */}
        {/* <div className="flex items-center justify-center">
          <LinkButton link={activeTab.link} text="View all" />
        </div> */}
      </div>
    </div>
  );
};

export default ProductTab;
