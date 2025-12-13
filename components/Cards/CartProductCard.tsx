import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import Link from "next/link";
import { useFormatAmount } from "@/hooks/useFormatAmount";

interface Props {
  data: {
    title: string;
    image: {
      url: string;
      alt: string;
    };
    sellingPrice: number;
    regularPrice: number;
  };
}

const CartProductCard: React.FC<Props> = ({ data }) => {
  const { formatAmount } = useFormatAmount();
  return (
    <div className="space-y-2 relative group">
      <div className="aspect-[4/4.8] overflow-hidden">
        <ImageWithFallback
          src={`${process.env.BACKBLAZE_URL}/${data.image.url}`}
          className={
            "h-full scale-105 duration-200 group-hover:scale-100 w-full object-cover flex-shrink-0"
          }
          alt={data.image.alt || "Product Image"}
          height={400}
          width={400}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Link
          href={"/checkout"}
          className="bg-templatePrimary  group-hover:block hidden cursor-pointer text-templateBackground px-5 py-2 rounded-full"
        >
          Checkout now
        </Link>
      </div>
      <h2 className="tracking-wide mb-1 leading-normal  text-sm break-words">
        {data.title}
      </h2>
      <div className="flex gap-2 font-sans items-center">
        <span className="tracking-wider text-base font-bold text-[#242424]">
          {formatAmount(data.sellingPrice)}
        </span>
        <span className="text-[0.75rem] line-through text-gray-500 tracking-wide">
          {formatAmount(data.regularPrice)}
        </span>
      </div>
    </div>
  );
};

export default CartProductCard;
