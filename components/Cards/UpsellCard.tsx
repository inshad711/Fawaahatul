import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import ATC from "../FunctionalButtons/ATC";

const UpsellCard = ({ item }: { item: any }) => {
  const { formatAmount } = useFormatAmount();
  return (
    <div className="space-y-2">
      <div className="aspect-[4/4.5] bg-gray-100">
        <ImageWithFallback
          src={`${process.env.BACKBLAZE_URL}/${item.images[0]}`}
          alt={item.name || "Product Image"}
          height={400}
          width={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h2 className="tracking-wide mb-1 line-clamp-1 leading-snug text-[13px] break-words">
          {item.name}
        </h2>
        <div className="flex flex-wrap gap-x-2 font-sans items-center">
          <span className="tracking-wider text-xs font-medium text-green-800">
            {formatAmount(item.price)}
          </span>
          <span className="text-[0.65rem] line-through text-gray-500 tracking-wide">
            {formatAmount(item.regular_price)}
          </span>
        </div>
      </div>
      {/* <ATC
        productData={item}
        dark={false}
        disabled={false}
        quickView={false}
        floating={false}
      /> */}
    </div>
  );
};

export default UpsellCard;
