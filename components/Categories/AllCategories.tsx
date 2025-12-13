import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "../Image/Fallbackimage";
import { collectionService } from "@/services/collectionService";

interface CategoryData {
  name: string;
  image: string;
  link: string;
}

interface CategoryProps {}

const AllCategories: React.FC<CategoryProps> = async () => {
  let categories: any = null;
  try {
    categories = await collectionService.getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null; // Handle error gracefully
  }

  if (!categories.success || !categories) {
    return null;
  }
  const activeCategories = categories?.data?.filter(
    (item: any) => item.status === "true"
  );
  if (categories.length === 0 || activeCategories.length === 0) {
    return null;
  }

  return (
    <div className="templateContainer py-6 md:py-8 lg:py-12 space-y-6">
      <div className="space-y-0.5">
        <h2 data-aos="fade-up" className="sectionHeading">
          Car Collections
        </h2>
        <p
          data-aos="fade-up"
          className="tracking-wider text-center text-[13px] text-gray-600"
        >
          Handpicked just for you
        </p>
      </div>

      <div className=" grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 items-start justify-center lg:gap-4">
        {activeCategories.map((item: CategoryData, index: number) => (
          <div data-aos="fade-up" key={index} className=" ">
            <Link
              href={`${item.link}`}
              className="flex flex-col items-center justify-center space-y-2 group"
            >
              <Image
                height={300}
                width={300}
                src={`${process.env.BACKBLAZE_URL}/${item.image}`}
                alt="cat"
                className="h-full w-full object-contain group-hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
              />
              {/* <h2 className="text-center text-templateText group-hover:text-templatePrimary transition-all ease-in-out !leading-tight duration-300 tracking-wide text-sm md:text-base">
              {item.name}
            </h2> */}
              {/* <span className="block w-0 group-hover:w-1/2 transition-all ease duration-200 bg-gray-300 h-[2px]"></span> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
