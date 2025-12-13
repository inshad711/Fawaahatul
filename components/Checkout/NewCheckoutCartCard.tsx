import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { Tag } from "lucide-react";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  cartData: {
    id: any;
    cod_disable: boolean;
    image: { url: string; alt: string };
    title: string;
    sellingPrice: number;
    regularPrice: number;
    quantity: number;
    variant_name: string;
    inStock: boolean;
    originalSellingPrice: number;
    discountApplied: string;
    taxAmount: number;
    isTaxable: boolean;
  };
  selectedPayment?: string;
}

const NewCheckoutCartCard: React.FC<Props> = ({ cartData }) => {
  const { currency } = useSelector((state: RootState) => state.newCheckout);
  const { formatAmount } = useFormatAmount();
  return (
    <div className="relative pointer-events-none lg:pointer-events-auto  hover:bg-gray-100 rounded p-2">
      <div className="flex items-center gap-2.5">
        {/* Product Image with Quantity Badge */}
        <div className={`relative w-8 h-10 lg:w-11 lg:h-14`}>
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${cartData?.image.url}`}
            alt={cartData?.image.alt || "Product Image"}
            sizes="80px"
            className="h-full w-full rounded-md  object-cover"
            height={80}
            width={80}
          />
          <span className="absolute -top-1 -right-2 rounded-full bg-templateText text-white text-[10px] font-semibold h-5 w-5 flex items-center justify-center shadow-md">
            {cartData?.quantity}
          </span>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-0.5">
          <h2 className={`tracking-wide text-xs font-medium text-templateText`}>
            {cartData?.title}{" "}
            {cartData?.variant_name && `- ${cartData.variant_name}`}
          </h2>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {cartData?.originalSellingPrice && cartData?.discountApplied ? (
                <>
                  <h2 className={`text-sm font-semibold text-green-600`}>
                    {formatAmount(Number(cartData?.sellingPrice))}
                  </h2>
                  {cartData?.isTaxable && (
                    <p className="text-xs text-blue-600 font-medium">
                      +{formatAmount(cartData?.taxAmount)} Tax{" "}
                    </p>
                  )}
                  {/* <h2 className={`text-xs font-medium text-red-600`}>
                    -{formatAmount(Number(cartData?.discountApplied), currency)}
                  </h2> */}
                  <div className="flex text-gray-500 bg-gray-100 px-2 py-1 rounded-lg items-center gap-1">
                    <Tag size={12} />
                    <span className="text-xs">
                      -{formatAmount(Number(cartData?.discountApplied))}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={`text-sm font-semibold text-green-600`}>
                    {formatAmount(Number(cartData?.sellingPrice))}
                  </h2>
                  {/* <h2 className="text-gray-500 line-through text-xs">
                    {formatAmount(Number(cartData?.regularPrice), currency)}
                  </h2> */}
                  {cartData?.isTaxable && (
                    <p className="text-xs text-blue-600 font-medium">
                      +{formatAmount(cartData?.taxAmount)} Tax{" "}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {!cartData.inStock && (
        <div className="flex border rounded items-center justify-center absolute inset-0 bg-white/50">
          <p className="text-red-600 text-xs">Out of stock</p>
        </div>
      )}
    </div>
  );
};

export default NewCheckoutCartCard;
