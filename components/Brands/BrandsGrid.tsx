import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { collectionService } from "@/services/collectionService";
import { brandService } from "@/services/brandService";
import LinkButton from "../Button/LinkButton";
import Link from "next/link";

const BrandsGrid = async () => {
  let data: any = null;
  try {
    data = await brandService.shopByBrands();
  } catch (error) {
    return null;
  }

  if (!data) {
    return null; // Handle error gracefully
  }

  if (!data.success || data.data.length === 0) return null;

  return (
    <div className="templateContainer  py-8 md:py-8 lg:py-10 space-y-5 lg:space-y-8">
      <h2 data-aos="fade-up" className="sectionHeading">
        Featured Brands
      </h2>
      <div className="grid mx-auto grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 lg:gap-8">
        {data?.data?.map((item: any, index: number) => (
          <Link
            data-aos="fade-up"
            // data-aos-delay={index * 100}
            href={`/collections/${item.slug}`}
            key={index}
            className="block group space-y-2 duration-200"
          >
            <div className="aspect-square flex items-center justify-center">
              <ImageWithFallback
                src={`${process.env.BACKBLAZE_URL}/${item.image}`}
                alt={item.name || "Brand Image"}
                className="group-hover:scale-95 duration-200"
                height={400}
                width={400}
              />
            </div>
            {/* <h3 className="text-center group-hover:-mt-1 duration-200 leading-tight text-templateText font-medium tracking-wide text-[13px] md:text-[15px]">
              {item.name}
            </h3> */}
          </Link>
        ))}
      </div>
      <div data-aos="fade-up" className="flex items-center justify-center">
        <LinkButton link="/brands" text="View All Brands" />
      </div>
    </div>
  );
};

export default BrandsGrid;
