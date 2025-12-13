import React from "react";
import ProductGallery from "./ProductGallery";
import CustomerReview from "../Review/CustomerReview";
import ProductInfo from "./ProductInfo";
import { productData } from "@/types/productData";
import ProductGrid from "../GridLayout/ProductGrid";
import Link from "next/link";
import Image from "next/image";

const ProductdetailV1: React.FC<productData> = ({ data }) => {
  console.log(data);

  return (
    <>
      {/* <pre>{JSON.stringify(data?.gallery, null, 2)}</pre> */}
      <div
        className={`py-4 overflow-x-hidden bg-templateBackground md:py-4  space-y-10 max-w-[1500px] mx-auto px-4 md:px-8 lg:px-28`}
      >
        <div className="flex flex-col md:flex-row w-full lg:py-5 gap-8">
          <div className={`w-full lg:p-2 lg:w-[55%] `}>
            <ProductGallery gallery={data?.gallery || []} />
          </div>
          <div className={`w-full lg:p-2 lg:w-[45%]`}>
            <ProductInfo data={data} />
          </div>
        </div>
      </div>

      {data?.totalReviews ? (
        <div
          id="reviews"
          className="templateContainer py-4 md:py-6 lg:py-10 space-y-10"
        >
          <CustomerReview
            overView={data?.overviewReviewData || []}
            totalReviews={data?.totalReviews}
            reviews={data?.reviews || []}
          />
        </div>
      ) : null}

      <ProductGrid text="You may also like" limit={5} />
    </>
  );
};

export default ProductdetailV1;
