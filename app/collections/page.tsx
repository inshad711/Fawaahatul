import LinkButton from "@/components/Button/LinkButton";
import CollectionsCard from "@/components/Collections/CollectionsCard";
import CollectionPagination from "@/components/Pagination/CollectionPagination";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { collectionService } from "@/services/collectionService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: `All Collections | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/collections`,
  },
};

const Collections = async ({ searchParams }: PageProps) => {
  const page = (await searchParams).page || 1;

  let response: any = null;
  try {
    response = await collectionService.getAllCollections(Number(page));
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return (
      <div className="templateContainer py-6 md:py-8 lg:py-10 space-y-6 text-center">
        <h2 className="text-lg text-templateText">
          Failed to load collections. Please try again later.
        </h2>
      </div>
    );
  }

  if (
    !response ||
    !response.success ||
    !response.data ||
    response.data.length === 0
  ) {
    return (
      <div className="templateContainer py-6 md:py-8 lg:py-10 space-y-6">
        <div className="w-full h-full p-5 space-y-4">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/placeholders/emptycart.webp"
              alt="empty cart"
              height={150}
              width={150}
            />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-templateText text-lg text-center">
              NO COLLECTION FOUND
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <LinkButton link="/" text="Explore Home" />
          </div>
        </div>
      </div>
    );
  }

  const { data, pagination } = response?.data;
  const { totalPages, currentPage } = pagination;

  return (
    <div className="py-8 md:py-8 lg:py-10 space-y-10 lg:space-y-14">
      <div className="space-y-2 lg:space-y-3 templateContainer ">
        <ul className="flex items-center justify-center gap-1 lg:gap-1.5 text-xs lg:text-sm tracking-wide">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <ChevronRight size={16} strokeWidth={1.5} />
          </li>
          <li className="underline underline-offset-4">Collections</li>
        </ul>
        <h2 className="text-2xl capitalize lg:text-[1.75rem] text-center !leading-[1.1] font-medium tracking-wide text-templateText">
          Shop By Collections
        </h2>
      </div>
      <div className="templateContainer  space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 lg:gap-x-2 gap-y-5 lg:gap-y-8">
          {data.map((item: any) => (
            <CollectionsCard key={item.collection_id} data={item} />
          ))}
        </div>

        <CollectionPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Collections;
