import { Rate } from "antd";
import React from "react";
// import ReviewFormModal from "./ReviewFormModal";
import { overviewData, reviewData } from "@/lib/reviewData";
import ReviewList from "./ReviewList";

interface Props {
  overView: {
    star: number;
    count: number;
    average: number;
  }[];
  totalReviews: number;
  reviews?: {
    rating?: string;
    review_text?: string;
    review_id?: string;
    media?: {
      url: string;
      alt: string;
    }[];
    author?: {
      customer_id: number;
      email: string;
      id: number;
      name: string;
      type: string;
    };
  }[];
}

const CustomerReview: React.FC<Props> = ({
  overView,
  totalReviews,
  reviews,
}) => {
  return (
    <div className="space-y-6 text-templateText">
      <div className="flex items-center gap-6">
        <h2 className="text-base lg:text-2xl uppercase font-light tracking-wider">
          Customer Reviews
        </h2>
      </div>
      {/* CUSTOMER REVEIW OVERVIEW */}
      <div className="flex flex-col gap-3">
        {overView?.map((item, index) => (
          <div className="flex items-center gap-3" key={index}>
            {/* Star Rating */}
            <Rate
              disabled
              defaultValue={item?.star}
              className="text-xs lg:text-sm"
            />

            {/* Progress Bar */}
            <div className="w-[120px] lg:w-[150px] bg-gray-200 rounded-sm">
              <div
                className="h-4 bg-[#FADB14] rounded-sm"
                style={{ width: `${item?.average}%` }}
              />
            </div>

            {/* Percentage and Count */}
            <div className="flex items-center gap-2 text-xs tracking-wide">
              <span className="min-w-[30px]">{item?.average}%</span>
              <span className="min-w-[30px]">({item?.count})</span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-gray-100"></div>
      {/* REVEIW LIST */}
      <ReviewList data={reviews as any} />
    </div>
  );
};

export default CustomerReview;
