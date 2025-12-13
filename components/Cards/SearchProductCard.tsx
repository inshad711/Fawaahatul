import Link from "next/link";
import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { useFormatAmount } from "@/hooks/useFormatAmount";
interface Props {
  item?: {
    slug: string;
    image: {
      url: string;
      alt: string;
    };
    name: string;
    price: number;
    regular_price: number;
  };
  handleClick?: any;
}

const SearchProductCard: React.FC<Props> = ({ item, handleClick }) => {
  const { formatAmount } = useFormatAmount();
  return (
    <Link
      onClick={handleClick}
      href={`/products/${item?.slug}`}
      className="block space-y-2 group cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <ImageWithFallback
          className="h-full w-full object-cover transition-all ease-in-out duration-200 group-hover:scale-105"
          src={`${process.env.BACKBLAZE_URL}/${item?.image?.url}`}
          alt={`${item?.image?.alt}` || "Product Image"}
          height={300}
          width={300}
        />
      </div>
      <h2 className="text-xs group-hover:text-templatePrimary line-clamp-2 tracking-wider text-templateText">
        {item?.name && item.name}
      </h2>
      <div className="flex gap-2 text-templateText">
        <span className="text-xs text-green-600 tracking-wide font-medium">
          {item?.price && formatAmount(item.price)}
        </span>
        <span className="text-[0.7rem] line-through text-gray-500 tracking-wide">
          {item?.regular_price && formatAmount(item.regular_price)}
        </span>
      </div>
    </Link>
  );
};

export default SearchProductCard;
