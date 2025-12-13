"use client";
import React from "react";
import UpsellCard from "./UpsellCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProductUpsell = ({
  recommendedProducts,
}: {
  recommendedProducts: any;
}) => {
  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-lg uppercase md:text-2xl  text-templateText tracking-wider">
        Pair it with!
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
        {recommendedProducts ? (
          <>
            {recommendedProducts?.length === 0 ? (
              <div className="text-center text-gray-500">
                No recommended products found
              </div>
            ) : (
              recommendedProducts?.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <UpsellCard item={item} />
                </React.Fragment>
              ))
            )}
          </>
        ) : (
          <>
            {Array(4)
              .fill(4)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-[4/4.5] rounded bg-gray-100 animate-pulse"></div>
                  <div className="w-full h-6 bg-gray-100 rounded animate-pulse"></div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductUpsell;
