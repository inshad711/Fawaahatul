import Product404 from "@/components/ProductDetail/Product404";
import ProductDetailPage from "@/components/ProductDetail/ProductDetailPage";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { productService } from "@/services/productService";
import React from "react";

interface Pageprops {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const fetchProductDetails = async (product_slug: string, variants: any) => {
  try {
    const response = await productService.getProductsBySlug(
      product_slug,
      variants
    );

    if (!response.success) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export async function generateMetadata({ params }: Pageprops) {
  const product_slug = (await params).slug;
  const data = await productService.getProductsSEOFields(product_slug);

  return {
    title: data?.data?.meta_title || defaultMetadata.title,
    description: data?.data?.meta_description || defaultMetadata.description,
    openGraph: {
      siteName: defaultMetadata.siteName,
      title: data?.data?.meta_title || defaultMetadata.title,
      description: data?.data?.meta_description || defaultMetadata.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${data?.data?.slug}`,
      type: "website",
      images: [
        {
          url:
            `${process.env.BACKBLAZE_URL}/${data?.data?.image}` ||
            defaultMetadata.ogimage,
          width: 1200,
          height: 630,
          alt: data?.data?.alt || defaultMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.meta_title || defaultMetadata.title,
      description: data?.data?.meta_description || defaultMetadata.description,
      images: [
        `${process.env.BACKBLAZE_URL}/${data?.data?.image}` ||
          defaultMetadata.ogimage,
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${data?.data?.slug}`,
    },
  };
}

const ProductDetail: React.FC<Pageprops> = async ({ params, searchParams }) => {
  const product_slug = (await params).slug;
  const variants = (await searchParams).variants;

  const data = await fetchProductDetails(product_slug, variants);

  if (!data) {
    return <Product404 />;
  }

  return <ProductDetailPage data={data} />;
};

export default ProductDetail;
