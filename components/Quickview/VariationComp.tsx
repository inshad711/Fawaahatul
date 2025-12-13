"use client";
import { Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import ATC from "../FunctionalButtons/ATC";
import NotifyMe from "../Button/NotifyMe";

interface Variation {
  id: number;
  name: string;
  values: string[];
}

interface Stock {
  combination: string;
  stock: number;
}

interface Props {
  available: number;
  productData: any;
  variations?: Variation[];
  stock: Stock[];
  currentVariant: string | null;
  isVariantProduct?: boolean;
  onVariantChange: (variantString: string) => void;
}

const VariationComp: React.FC<Props> = ({
  available,
  productData,
  stock,
  currentVariant,
  variations,
  isVariantProduct,
  onVariantChange,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, string>
  >({});

  // Initialize variants or maintain selected ones
  useEffect(() => {
    if (!isVariantProduct || !variations?.length) return;

    // If currentVariant exists, parse it to maintain selection
    if (currentVariant) {
      const variantArray = currentVariant.split(",");
      const newSelection = variations.reduce((acc, variation, index) => {
        acc[variation.id] = variantArray[index] || variation.values[0];
        return acc;
      }, {} as Record<number, string>);
      setSelectedVariants(newSelection);
    }
    // If no currentVariant, set default first variations
    else if (!Object.keys(selectedVariants).length) {
      const initialSelection = variations.reduce((acc, variation) => {
        acc[variation.id] = variation.values[0];
        return acc;
      }, {} as Record<number, string>);
      setSelectedVariants(initialSelection);
      onVariantChange(Object.values(initialSelection).join(","));
    }
  }, [isVariantProduct, variations, currentVariant, onVariantChange]);

  const handleVariantSelect = useCallback(
    (variationId: number, value: string) => {
      setSelectedVariants((prev) => {
        const updated = { ...prev, [variationId]: value };
        const variantString = Object.values(updated).join(",");
        onVariantChange(variantString);
        return updated;
      });
    },
    [onVariantChange]
  );

  const currentStock = useMemo(() => {
    if (isVariantProduct) {
      const stockItem = stock.find(
        (item) => item.combination.replace(" ", "") === currentVariant
      );
      return stockItem?.stock || 0;
    } else {
      return available;
    }
  }, [stock, available, currentVariant]);

  const reStructuredProductData = {
    id: productData.id,
    name: productData.name,
    gallery: productData.gallery,
    regularPrice: productData.regularPrice,
    sellingPrice: productData.price,
    slug: productData.slug,
    isVariantProduct: productData.isVariantProduct,
    variants: productData.variants,
    combination: currentVariant || undefined,
  };

  return (
    <div className="space-y-4 ">
      {/* <div>
        {currentStock <= 0 ? (
          <span className="text-sm font-semibold tracking-wide text-red-600">
            ( Out of stock )
          </span>
        ) : currentStock >= 10 ? (
          <span className="text-sm font-semibold tracking-wide text-green-600">
            {currentStock} in stock
          </span>
        ) : currentStock < 10 ? (
          <span className="text-sm font-semibold tracking-wide text-orange-600">
            Hurry! only {currentStock} left in stock
          </span>
        ) : null}
      </div> */}
      {isVariantProduct &&
        variations?.map((variation) => (
          <div key={variation.id} className="space-y-1">
            <h2 className="uppercase tracking-widest text-xs text-templateText">
              {variation.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {variation.values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleVariantSelect(variation.id, value)}
                  disabled={!variation.values.includes(value)}
                  className={`px-3.5 py-2 border rounded-[2px] text-templateText text-xs hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] tracking-widest uppercase transition-transform  ${
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

      {/* {currentStock !== undefined && (
        <div>
          {currentStock <= 0 ? (
            <span className="text-sm font-semibold tracking-wide text-red-600">
              Out of stock
            </span>
          ) : currentStock > 10 ? (
            <span className="text-sm font-semibold tracking-wide text-green-600">
              {currentStock} in stock
            </span>
          ) : currentStock < 10 ? (
            <span className="text-sm font-semibold tracking-wide text-orange-600">
              Hurry! only {currentStock} left in stock
            </span>
          ) : null}
        </div>
      )} */}

      {currentStock === 0 ? (
        <div className="w-full">
          <div className="fixed bg-white left-0 bottom-0 w-full z-10 md:z-auto p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:shadow-none border-t md:border-none md:p-0 md:relative flex items-center gap-1">
            <NotifyMe productId={productData.id} />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="fixed bg-white left-0 bottom-0 w-full z-[1] lg:z-auto p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:shadow-none border-t md:border-none md:p-0 md:relative flex items-start gap-1">
            <ATC
              quickView={true}
              productData={reStructuredProductData}
              dark={false}
              disabled={currentStock === 0}
            />
            {/* <button
              disabled={currentStock === 0}
              className="flex items-center uppercase justify-center w-full gap-2 border border-templateBlack bg-templateBlack hover:opacity-90 py-3 text-sm text-white font-medium disabled:opacity-50"
            >
              <Heart size={18} strokeWidth={1.5} /> Buy Now
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariationComp;
