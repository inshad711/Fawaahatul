import CollectionPage from "@/components/Collections/CollectionPage";
import { collectionService } from "@/services/collectionService";
import { Metadata } from "next";
import React, { Suspense } from "react";

interface Pageprops {
  params: Promise<{ collection_name: string }>;
}

export async function generateMetadata({ params }: Pageprops) {
  const collection_name = (await params).collection_name;
  const data = await collectionService.getCollectionsSEOFields(collection_name);

  return {
    title: data?.data?.meta_title || "Hutz Diecast",
    description:
      data?.data?.meta_description ||
      "Explore our collection of diecast models at Hutz Diecast. Find your favorite brands and models in high-quality detail.",
    openGraph: {
      siteName: "Hutz Diecast",
      title: data?.data?.meta_title,
      description: data?.data?.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${data?.data?.slug}`,
      type: "website",
      images: [
        {
          url:
            `${process.env.BACKEND}/upload/collectionImage/${data?.data?.image}` ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logos/logowithwhitebg.png`,
          width: 1200,
          height: 630,
          alt: data?.data?.alt || "defaultTitle",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.meta_title || "defaultTitle",
      description: data?.data?.meta_description || "defaultDescription",
      images: [
        `${process.env.BACKEND}/upload/collectionImage/${data?.data?.image}` ||
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logos/logowithwhitebg.png`,
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/collections/${data?.data?.slug}`,
    },
  };
}

const CollectionName = async () => {
  return (
    <Suspense>
      <CollectionPage />
    </Suspense>
  );
};

export default CollectionName;
