import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { Check, Copy, ReceiptText } from "lucide-react";
import {
  RiProgress2Line,
  RiProgress3Line,
  RiProgress5Line,
} from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { Button } from "../ui/button";
import { Tag } from "antd";
import WriteReview from "../Review/WriteReview";
import { SiTicktick } from "react-icons/si";
import ReviewListCard from "../Review/ReviewListCard";

interface Props {
  data: {
    manual_order_status?: string;
    order_id: number;
    total_items: number;
    is_fulfilled: boolean;
    channel: string;
    total_price: string;
    payment_status: string;
    original_order_data: any[];
    customer: {
      default_address: {
        apartment: string;
        address: string;
        city: string;
        state: string;
        postalcode: string;
      };
    };
    order_summary: {
      shipping_amount: string;
      subtotal: number;
      total_amount: number;
      discount_amount: string;
    };
    items: any[];
    fulfilled_items: any;
    fulfill_orders: any[];
  };
}

const renderItemCard = (item: any) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-12 rounded overflow-hidden w-11">
        <ImageWithFallback
          src={`${process.env.BACKBLAZE_URL}/${item?.variant_image?.[0]}`}
          alt={"Product Image"}
          className={"object-cover h-full w-full"}
          height={50}
          width={50}
        />
      </div>
      <div className="space-y-1">
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
  );
};

export const ShowDetail: React.FC<Props> = ({ data }) => {
  const { formatAmount } = useFormatAmount();
  const [appliedForCancellation, setAppliedForCancellation] =
    React.useState(false);

  const handleCancelOrder = () => {};

  return (
    <div className="space-y-4 text-templateText">
      {appliedForCancellation && (
        <div className="bg-yellow-100 space-y-1 rounded-md p-4">
          <p>
            <span className="text-xl font-normal">Cancellation Requested</span>{" "}
          </p>
          <p>
            We have received your cancellation request. Your order is being
            processed. You will receive a confirmation email once your order is
            cancelled.
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium text-sm tracking-wide">
            Order {data?.order_id}
          </p>
          <p className="font-semibold text-sm tracking-wide">
            {data?.total_items} items
          </p>
        </div>
        {/* {!data?.is_fulfilled && (
          <Button
            onClick={handleCancelOrder}
            variant={"outline"}
            className="text-xs"
          >
            Cancel Order
          </Button>
        )} */}
      </div>
      <hr />

      <div
        className={`flex items-center ${
          data?.manual_order_status?.toLowerCase() === "delivered"
            ? "text-green-600"
            : "text-blue-600"
        } justify-between`}
      >
        <div className={`flex items-center gap-2`}>
          <div className="h-11 capitalize rounded overflow-hidden w-11 flex items-center justify-center bg-gray-100">
            {data?.manual_order_status?.toLowerCase() === "open" && (
              <RiProgress3Line size={30} />
            )}
            {data?.manual_order_status?.toLowerCase() === "processing" && (
              <RiProgress5Line size={30} />
            )}
            {data?.manual_order_status?.toLowerCase() === "Shipped" && (
              <RiProgress5Line size={30} />
            )}
            {data?.manual_order_status?.toLowerCase() === "delivered" && (
              <SiTicktick size={25} />
            )}
          </div>
          <h3 className="text-2xl lg:text-3xl capitalize font-semibold">
            {data?.manual_order_status}
          </h3>
        </div>
      </div>

      {data?.original_order_data?.length > 0 && (
        <div className="space-y-4 bg-gray-100/70 p-4 rounded-md">
          <h3 className="font-semibold text-sm capitalize tracking-wide ">
            {data?.original_order_data.length > 1 ? "items" : "item"} progress
          </h3>
          {data?.original_order_data.map((item, index) => (
            <div key={index}>
              <ReviewListCard
                item={item}
                show={Boolean(
                  data?.manual_order_status?.toLowerCase() === "delivered"
                )}
                order_id={data.order_id}
              />
            </div>
          ))}
        </div>
      )}

      {data?.fulfill_orders &&
        data?.fulfill_orders?.length > 0 &&
        data?.fulfill_orders.map((item, index) => (
          <div key={index} className="space-y-4  bg-gray-100 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm capitalize tracking-wide ">
                {item.products.length > 1 ? "items" : "item"} fullfilled
              </h3>
            </div>
            {item.products.map((item: any, index: number) => (
              <div key={index}>
                <ReviewListCard
                  item={item}
                  show={Boolean(
                    data?.manual_order_status?.toLowerCase() === "delivered"
                  )}
                  order_id={data.order_id}
                />
              </div>
            ))}
            <div className="space-y-2">
              <h4 className="font-medium text-xs text-gray-800 tracking-wide">
                Shipping Partner : {item?.partner || "N/A"}
              </h4>
              <h4 className="font-medium text-xs text-gray-800 tracking-wide">
                Tracking Number :{" "}
                {item?.shiprocket_response?.data?.awb_code || "N/A"}
              </h4>
              <h4 className="font-medium text-xs text-gray-800 tracking-wide">
                Courier Number :{" "}
                {item?.shiprocket_response?.data?.courier_name || "N/A"}
              </h4>
            </div>
          </div>
        ))}

      <hr />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ReceiptText size={18} />
          <h3 className="text-sm tracking-wide font-semibold">Bill Summary</h3>
        </div>
        <div className="space-y-4 text-sm font-medium tracking-wide">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-[13px] text-black tracking-wider">
              {data?.order_summary?.subtotal
                ? formatAmount(Number(data.order_summary.subtotal))
                : "-"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Discount Amount</p>
            <p className="text-[13px] text-black tracking-wider">
              {data?.order_summary?.discount_amount
                ? formatAmount(Number(data.order_summary.discount_amount))
                : "-"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Taxes</p>
            <p className="text-[13px] text-black tracking-wider">
              {/* {formatAmount(44799)} */} -
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="text-[13px] text-black tracking-wider">
              {data?.order_summary?.shipping_amount
                ? formatAmount(Number(data?.order_summary?.shipping_amount))
                : "-"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Total Amount</p>
            <p className="text-[13px] text-black tracking-wider">
              {formatAmount(Number(data?.total_price))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Payment Method</p>
            <Tag
              color={"green"}
              className="text-[13px] px-3 py-1 text-black tracking-wider"
            >
              {data?.channel === "COD" || data?.channel === "cash_on_delivery"
                ? "Cash On Delivery"
                : "Online"}
            </Tag>
          </div>
          {data?.payment_status === "Paid" && (
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Paid</p>
              <p className="text-[13px] text-black tracking-wider">
                {formatAmount(Number(data?.total_price))}
              </p>
            </div>
          )}

          {/* <div className="flex items-center justify-center">
            <button className="relative overflow-hidden pr-1">
              <span
                className={`px-4 py-2 rounded text-xs tracking-wide bg-white border border-templateBlack text-templateText flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out shadow-md hover:scale-100 
        before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-templateText before:to-templateBlack before:transition-all before:duration-500 before:ease-in-out before:z-[-1] 
        hover:text-white hover:before:left-0`}
              >
                Download Invoice
              </span>
            </button>
          </div> */}
        </div>
      </div>
      <hr />
      <div className="space-y-4">
        <h3 className="text-sm tracking-wide font-semibold">Order Details</h3>
        <div className="text-xs space-y-0.5 tracking-wide font-medium">
          <p className="text-gray-500">Order ID</p>
          <p>{data?.order_id}</p>
        </div>
        <div className="text-xs space-y-0.5 tracking-wide font-medium">
          <p className="text-gray-500">Delivery Address</p>
          <p className="text-gray-600">
            {data?.customer?.default_address?.apartment},{" "}
            {data?.customer?.default_address?.address},{" "}
            {data?.customer?.default_address?.city},{" "}
            {data?.customer?.default_address?.state},{" "}
            {data?.customer?.default_address?.postalcode}
          </p>
        </div>
        <div className="text-xs space-y-0.5 tracking-wide font-medium">
          <p className="text-gray-500">Order Placed</p>
          {/* <p>6th Feb 2025, 04:17 pm</p> */}
          <p>-</p>
        </div>
      </div>
    </div>
  );
};
