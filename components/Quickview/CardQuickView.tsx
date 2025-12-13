"use client";
import { Modal } from "antd";
import { Expand, MoveRight } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "../Loader/Loader";
import VariationComp from "./VariationComp";
import { calculateDiscount } from "@/utils/constants";
import ProductGallery from "../ProductDetail/ProductGallery";
import ProductTitle from "../ProductDetail/ProductTitle";
import SmallIconWithText from "../ProductDetail/SmallIconWithText";
import Link from "next/link";
import DetailPageFAQ from "../FAQ/DetailPageFAQ";
import { useFormatAmount } from "@/hooks/useFormatAmount";

interface Props {
  slug: string;
}

const CardQuickView: React.FC<Props> = ({ slug }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<string | null>(null);
  const { formatAmount } = useFormatAmount();
  const handleCancel = () => {
    setOpen(false);
    setSelectedVariants(null);
  };

  const fetchProductDetails = useCallback(
    async (productSlug: string, variants?: string | null) => {
      setLoading(true);
      try {
        const url = new URL(
          `${process.env.BACKEND}/api/getProductBySlug/${productSlug}`
        );
        if (variants) url.searchParams.append("variants", variants);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch product details");
        const result = await response.json();
        setProductData(result);

        // Only set default variants if none are selected yet
        if (!selectedVariants && result?.variations?.length) {
          const initialVariant = result.variations
            .map((v: any) => v.values[0])
            .join(",");
          setSelectedVariants(initialVariant);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    },
    [selectedVariants]
  ); // Add selectedVariants as dependency

  useEffect(() => {
    if (selectedVariants || open) fetchProductDetails(slug, selectedVariants);
  }, [selectedVariants, slug, open, fetchProductDetails]);

  return (
    <div className="relative">
      <div className="flex  items-center justify-center w-full">
        <button
          onClick={() => setOpen(true)}
          className="px-5 cursor-pointer text-xs hover:scale-90 duration-300 transition-all ease-in-out tracking-wide flex items-center gap-2 py-2 bg-black text-white rounded-full"
        >
          Quick view <Expand size={14} strokeWidth={1.5} className="mt-0.5" />
        </button>
      </div>
      <Modal
        open={open}
        onCancel={handleCancel}
        width={1200}
        style={{ top: "20px" }}
        footer={null}
      >
        {loading ? (
          <Loader />
        ) : productData ? (
          <div className="templateContainer py-4 space-y-10">
            <div className="flex flex-col md:flex-row w-full lg:py-5 gap-5">
              <div className="w-full z-[1] sticky top-0 h-full lg:p-2 lg:w-[50%]">
                <ProductGallery gallery={productData.gallery || []} />
              </div>
              <div className="w-full lg:p-2 lg:w-[50%] space-y-5">
                <ProductTitle
                  quickView={true}
                  title={productData.name}
                  average_rating={productData.average_rating}
                  totalReviews={productData.totalReviews}
                />
                <div>
                  <div className="flex items-end gap-3">
                    <span className="text-2xl lg:text-3xl text-templateText">
                      {formatAmount(Number(productData.price || 0))}
                    </span>
                    {productData.regularPrice && (
                      <span className="text-[0.85rem] pb-1 line-through text-gray-500 tracking-wide">
                        {formatAmount(Number(productData.regularPrice))}
                      </span>
                    )}
                    {productData.regularPrice &&
                    productData.price &&
                    productData.regularPrice > productData.price ? (
                      <span className="text-xs lg:text-sm pb-1 text-green-500">
                        (
                        {calculateDiscount(
                          Number(productData.regularPrice),
                          Number(productData.price)
                        )}
                        % OFF)
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[0.7rem] pb-1 tracking-wide text-gray-500">
                    Tax included. Shipping calculated at checkout.
                  </span>
                </div>
                <VariationComp
                  productData={productData}
                  variations={productData.variations}
                  available={productData.available}
                  stock={productData.stock}
                  currentVariant={selectedVariants}
                  isVariantProduct={productData.isVariantProduct}
                  onVariantChange={setSelectedVariants}
                />
                {/* <SmallIconWithText /> */}
                <div className="">
                  <input type="checkbox" id="toggle" className="hidden peer" />

                  <div
                    dangerouslySetInnerHTML={{
                      __html: productData?.description || "",
                    }}
                    className="productDescription space-y-4 line-clamp-5 peer-checked:line-clamp-none"
                  ></div>

                  <label
                    htmlFor="toggle"
                    className="text-templateText text-[0.85rem] underline cursor-pointer block mt-2 peer-checked:before:content-['Read_less'] before:content-['Read_more']"
                  ></label>
                </div>
                {/* <DetailPageFAQ /> */}
                <div>
                  <Link
                    className="text-xs text-templateRed hover:underline hover:text-templateRed flex items-center gap-2 font-medium tracking-wide"
                    href={"/products/" + productData.slug}
                  >
                    View full details{" "}
                    <MoveRight
                      size={15}
                      className="text-templateRed mt-[1px]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default CardQuickView;
