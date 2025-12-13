import { updateProductData } from "@/store/slice/productDataSlice";
import { RootState } from "@/store/store";
import { BadgeCheck, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  title?: string;
  average_rating?: number;
  totalReviews?: number;
  quickView?: boolean;
}
const ProductTitle: React.FC<Props> = (props) => {
  // const dispatch = useDispatch();
  const { title, average_rating, totalReviews, quickView = false } = props;
  const announcements = [
    "20% off everything! Shop Now",
    "Free shipping on orders over $50!",
    "New arrivals in stock! Check them out.",
  ];
  return (
    <div>
      {title ? (
        <h1 className="text-xl leading-snug lg:text-3xl uppercase text-templateText tracking-wider ">
          {title}
        </h1>
      ) : (
        <div className="space-y-2">
          <div className="bg-gray-100 w-full h-5 rounded"></div>
          <div className="bg-gray-100 w-1/2 h-5 rounded"></div>
        </div>
      )}
      {/* <div className="w-full flex items-center justify-start overflow-hidden">
        <div
          className="announcement-lines flex flex-col !h-[20px] lg:!h-[35px] !items-start justify-center"
          style={{ "--lines": announcements.length } as React.CSSProperties}
        >
          {announcements.map((announcement, index) => (
            <h2
              key={index}
              className="line text-[12px] lg:text-[13px] tracking-wider leading-none text-templateRed"
              style={{ animationDelay: `${index * 3}s` }} // Dynamic delay for each line
            >
              {announcement}
            </h2>
          ))}
        </div>
      </div> */}
      {totalReviews && totalReviews >= 1 ? (
        <>
          {quickView ? (
            <div className="flex items-center gap-2 mt-2 text-templateDark">
              {average_rating && (
                <>
                  <div className="flex items-center gap-1">
                    <Star fill="#FFB503" color="#FFB503" size={15} />
                    <span className="text-xs text-templateText">
                      {average_rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-gray-400"></div>
                </>
              )}
              <div className="flex items-center gap-1">
                <BadgeCheck fill="#156BFF" color="white" size={15} />
                <span className="text-xs text-templateText">
                  ( {totalReviews} Reviews )
                </span>
              </div>
            </div>
          ) : (
            <Link href="#reviews">
              <div className="flex items-center gap-2 mt-2 cursor-pointer text-templateDark">
                {average_rating && (
                  <>
                    <div className="flex items-center gap-1">
                      <Star fill="#FFB503" color="#FFB503" size={15} />
                      <span className="text-xs text-templateText">
                        {average_rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-400"></div>
                  </>
                )}
                <div className="flex items-center gap-1">
                  <BadgeCheck fill="#156BFF" color="white" size={15} />
                  <span className="text-xs text-templateText">
                    ( {totalReviews} Reviews )
                  </span>
                </div>
              </div>
            </Link>
          )}
        </>
      ) : null}
    </div>
  );
};

export default ProductTitle;
