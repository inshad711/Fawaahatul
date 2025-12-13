import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Searchbybrand from "@/components/Brands/Searchbybrand";
import { Metadata } from "next";
import { defaultMetadata } from "@/lib/defaultMetadata";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: `Brands | ${defaultMetadata.title}`,
  description: defaultMetadata.description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/brands`,
  },
};

export const revalidate = 60;

const Brands = async ({ searchParams }: PageProps) => {
  const alphabet = (await searchParams).alphabet;
  return (
    <div className="templateContainer py-6 md:py-8 lg:py-12 space-y-6 md:space-y-8 lg:space-y-10">
      <div className="flex gap-4 flex-col items-center justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-normal text-templateText"
                href="/"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/brands">Brands</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl md:text-4xl tracking-wide">BRANDS</h1>
      </div>
      <Searchbybrand paramAlphabet={alphabet} />
    </div>
  );
};

export default Brands;
