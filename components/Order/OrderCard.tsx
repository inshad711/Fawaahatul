import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { ChevronRight, CircleCheck, CircleHelp, CircleX } from "lucide-react";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import Link from "next/link";

interface Props {
  item: {
    is_fulfilled: boolean;
    order_id: number;
    order_date: string;
    current_order_status: string;
    channel: string;
    total_price: string;
    payment_status: string;
    total_items: string;
    updated_at: null;
  };
}

const OrderCard: React.FC<Props> = ({ item }) => {
  const { formatAmount } = useFormatAmount();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Get date parts
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // "Feb"
    const year = date.getFullYear();

    // Get hours, minutes, and AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    // Add ordinal suffix to the day (1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (num: number) => {
      if (num > 3 && num < 21) return "th"; // Covers 11th, 12th, 13th...
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinalSuffix(
      day
    )} ${month} ${year}, ${hours}:${minutes} ${amPm}`;
  };
  return (
    <Link href={`/order/${item.order_id}`} className="block ">
      <div className="border cursor-pointer border-gray-100 shadow-sm transition-all ease-in-out duration-200 hover:scale-[1.01] hover:border-gray-200 flex items-end justify-between px-3 py-5 lg:p-5 rounded-xl">
        <div className="space-y-3">
          <div className="flex gap-2">
            {Array(2)
              .fill(2)
              .map((item, index) => (
                <ImageWithFallback
                  key={index}
                  className={
                    "h-11 w-11 rounded-md border object-cover shadow-md"
                  }
                  src={"https://alsadeeqperfumes.com"}
                  alt={"Product Image"}
                  height={100}
                  width={100}
                />
              ))}
          </div>
          <div className="space-y-1">
            {item.is_fulfilled ? (
              <h2 className="flex text-sm tracking-wide items-center gap-1">
                Order delivered{" "}
                <CircleCheck
                  size={20}
                  className="mt-0.5"
                  color="white"
                  fill="green"
                />
              </h2>
            ) : (
              <h2 className="flex text-sm tracking-wide items-center gap-1">
                Order in progress{" "}
                <CircleHelp
                  size={20}
                  className="mt-0.5"
                  color="white"
                  fill="gray"
                />
              </h2>
            )}
            <p className="text-gray-500 font-medium text-[11px] lg:text-xs tracking-wide">
              Placed at {formatDate(item.order_date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0 lg:gap-2">
          <span className="text-sm lg:text-base tracking-wide font-bold text-templateText">
            {formatAmount(Number(item.total_price))}
          </span>
          <ChevronRight size={18} className="lg:mt-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
