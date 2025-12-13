import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import WriteReview from "./WriteReview";
import { Check } from "lucide-react";

const ReviewListCard = ({
  item,
  show,
  order_id,
}: {
  item: any;
  show: boolean;
  order_id: number;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center w-full justify-between gap-2">
        <div className="h-12 rounded overflow-hidden w-12">
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${item?.variant_image?.[0]}`}
            alt={"Product Image"}
            className={"object-cover h-full w-full"}
            height={50}
            width={50}
          />
        </div>
        <div className="space-y-1 w-full">
          <h4 className="text-[12.5px] tracking-wide text-templateText">
            {item?.name}
          </h4>
          <div className="text-[11px] space-x-1.5 text-gray-500 font-normal tracking-wide">
            {item?.variant_name && (
              <>
                <span>{item?.variant_name}</span>
                <span>x</span>
              </>
            )}
            <span>{item?.quantity} unit</span>
          </div>
        </div>
      </div>
      <div className="">
        {show && !item?.is_reviewed ? (
          <WriteReview data={item} order_id={order_id} />
        ) : (
          <p className="text-green-600 text-sm flex items-center justify-end">
            Reviewed <Check size={18} />
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewListCard;
