"use client";
import { Bell, Heart, ShoppingBag } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AddToCart from "../Cards/AddToCart";
import ATC from "../FunctionalButtons/ATC";
import Buy from "../FunctionalButtons/Buy";
import BottomStickyAddToCart from "./BottomStickyAddToCart";
import AddToWishlist from "../Wishlist/AddToWishlist";
import NotifyMe from "../Button/NotifyMe";

interface Props {
  preOrder: boolean;
  data: any;
  variations: {
    id: number;
    name: string;
    values: string[];
  }[];
  stock: {
    combination: string;
    stock: number;
  }[];
  isVariantProduct?: boolean;
}

const ProductVariation: React.FC<Props> = ({
  preOrder,
  data,
  stock,
  variations,
  isVariantProduct,
}) => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const variants = params.get("variants");
  const pathname = usePathname();
  const router = useRouter();
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: number]: string;
  }>({});

  const handleVariantSelect = (variationId: number, value: string) => {
    setLoading(true);

    setSelectedVariants((prev) => {
      const updatedVariants = { ...prev, [variationId]: value };

      // console.log(updatedVariants, "selectedVariants (inside setState)"); // ✅ Correctly logs new state

      // ✅ Maintain order using variations array
      const orderedVariants = variations
        .map((variation) => updatedVariants[variation.id]) // Pick values in correct order
        .filter(Boolean); // Remove undefined values

      // ✅ Update URL with correctly ordered state
      const query = new URLSearchParams(params.toString());
      query.set("variants", orderedVariants.join(","));
      router.push(`${pathname}?${query.toString()}`, { scroll: false });

      return updatedVariants;
    });
  };

  const checkVariants = () => {
    const query = new URLSearchParams(params.toString());

    if (variants) {
      const variantArray = variants.split(",");
      const selected: { [key: number]: string } = {};

      // ✅ Maintain order using variations array
      variations?.forEach((variation, index) => {
        selected[variation.id] = variantArray[index] || variation.values[0];
      });

      setSelectedVariants(selected);
    } else {
      const defaultSelected: { [key: number]: string } = {};

      // ✅ Maintain order while setting default values
      variations?.forEach((variation) => {
        defaultSelected[variation.id] = variation.values[0];
      });

      setSelectedVariants(defaultSelected);

      // ✅ Set URL with correct order
      const orderedVariants = variations
        .map((variation) => defaultSelected[variation.id]) // Pick values in correct order
        .filter(Boolean); // Remove undefined values

      query.set("variants", orderedVariants.join(","));
      router.push(`${pathname}?${query.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (isVariantProduct && variations?.length > 0) {
      checkVariants();
    }
  }, [variants, variations]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [variations]);

  const isOutOfStock = (() => {
    // ✅ Maintain order using variations array
    const currentCombination = variations
      .map((v) => selectedVariants[v.id]) // Pick values in correct order
      .filter(Boolean) // Remove undefined values
      .join(", ");

    // console.log(currentCombination, stock);
    const stockEntry = stock.find(
      (item) => item.combination === currentCombination
    );

    return stockEntry
      ? stockEntry.stock === 0
        ? true
        : stockEntry.stock
      : false;
  })();

  const reStructuredProductData = {
    id: data.id,
    name: data.name,
    gallery: data.gallery,
    stock: data.available,
    regularPrice: data.regularPrice,
    sellingPrice: data.price,
    slug: data.slug,
    isVariantProduct: data.isVariantProduct,
    variants: data.variants,
    combination: variants ? variants : undefined,
  };

  // const disabled = loading || (data.stock.length === 0 && data.available <= 0);
  const disabled = loading || data.stock.length === 0 || isOutOfStock === true;

  if (isVariantProduct) {
    return (
      <>
        <div className="space-y-4 relative">
          {isVariantProduct &&
            variations?.map((variation) => (
              <div key={variation.id} className="space-y-1.5">
                <h2 className=" tracking-widest text-[13px] text-templateText">
                  {variation.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {variation.values.map((value) => (
                    <button
                      disabled={
                        loading || selectedVariants[variation.id] === value
                      }
                      key={value}
                      onClick={() => handleVariantSelect(variation.id, value)}
                      className={`px-3.5 py-2 border rounded-[2px] text-templateText text-xs hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] tracking-widest uppercase transition-transform ${
                        selectedVariants[variation.id] === value
                          ? "border-templateText shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                          : "border-templateText/20"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          {loading && (
            <div className="text-sm text-gray-500">
              Loading new variation...
            </div>
          )}

          {/* {Object.keys(selectedVariants).length > 0 && !loading && (
            <div className="text-sm space-y-1 font-medium text-gray-700">
              <div>Selected: {Object.values(selectedVariants).join(", ")}</div>
              <div>
                {isOutOfStock === true ? (
                  <span className="text-sm font-semibold tracking-wide text-red-600">
                    ( Out of stock )
                  </span>
                ) : typeof isOutOfStock === "number" && isOutOfStock >= 10 ? (
                  <span className="text-sm font-semibold tracking-wide text-green-600">
                    {isOutOfStock} in stock
                  </span>
                ) : typeof isOutOfStock === "number" && isOutOfStock < 10 ? (
                  <span className="text-sm font-semibold tracking-wide text-orange-600">
                    Hurry! only {isOutOfStock} left in stock
                  </span>
                ) : null}
              </div>
            </div>
          )} */}

          {disabled ? (
            <div className="w-full">
              <div className="fixed bg-white left-0 bottom-0 w-full z-[1] md:z-auto p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:shadow-none border-t md:border-none md:p-0 md:relative flex items-center gap-1">
                <NotifyMe productId={data.id} />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="fixed bg-white left-0 bottom-0 w-full z-[1] md:z-1 p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:shadow-none border-t md:border-none md:p-0 md:relative flex items-center gap-1">
                <ATC
                  preOrder={preOrder}
                  productData={reStructuredProductData}
                  dark={false}
                  disabled={Boolean(disabled)}
                />
                {/* <Buy disabled={disabled} /> */}
                <button className="flex duration-300 hover:bg-gray-100 items-center justify-center w-24 gap-2 hover:opacity-90 py-3.5 text-sm text-templateText font-medium disabled:opacity-50">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}
        </div>
        <BottomStickyAddToCart
          data={reStructuredProductData}
          dark={false}
          disabled={disabled}
        />
      </>
    );
  } else {
    const disabled = loading || data.available === 0;
    return (
      <div className="space-y-4">
        {/* <div>
          {!data.available ? (
            <span className="text-sm font-semibold tracking-wide text-red-600">
              ( Out of stock )
            </span>
          ) : data.available >= 10 ? (
            <span className="text-sm font-semibold tracking-wide text-green-600">
              {data.available} in stock
            </span>
          ) : data.available < 10 ? (
            <span className="text-sm font-semibold tracking-wide text-orange-600">
              Hurry! only {data.available} left in stock
            </span>
          ) : null}
        </div> */}

        {data?.isPreOrder ? (
          <div>PreOrderOnly</div>
        ) : (
          <div className="z-[1]">
            {data.available === 0 ? (
              <NotifyMe productId={data.id} />
            ) : (
              <div className="w-full">
                <div className="fixed bg-white left-0 bottom-0 w-full z-[1] md:z-auto p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:shadow-none border-t md:border-none md:p-0 md:relative flex items-center gap-1">
                  <ATC
                    preOrder={preOrder}
                    productData={reStructuredProductData}
                    dark={false}
                    disabled={Boolean(disabled)}
                  />
                  {/* <Buy disabled={Boolean(data.availabe <= 0)} /> */}
                  {pathname.includes("/products") ? null : (
                    <AddToWishlist
                      isInWishlist={data?.isInWishlist}
                      itemId={data?.id}
                      detailPage={true}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <BottomStickyAddToCart
          data={reStructuredProductData}
          dark={false}
          disabled={disabled}
        />
      </div>
    );
  }
};

export default ProductVariation;
