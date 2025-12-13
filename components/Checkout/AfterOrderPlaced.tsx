"use client";
import React, { useEffect, useRef } from "react";

import ImageWithFallback from "../Image/Fallbackimage";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { Button } from "../ui/button";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";

const AfterOrderPlaced = ({ orderSummary }: { orderSummary: any }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const { formatAmount } = useFormatAmount();

  // useEffect(() => {
  //   if (
  //     !hasTracked.current &&
  //     typeof window !== "undefined" &&
  //     typeof window.gtag !== "undefined" &&
  //     orderSummary
  //   ) {
  //     window.gtag("event", "purchase", {
  //       transaction_id: orderSummary?.order_id || "UNKNOWN",
  //       value: orderSummary?.order_summary?.total_amount || 0,
  //       currency: "INR",
  //       tax: orderSummary?.order_summary?.taxes || 0,
  //       shipping: orderSummary?.order_summary?.shhipping_amount || 0,
  //       items:
  //         orderSummary?.items?.map((item: any) => ({
  //           item_id: item?.variant_name || item?.item_id || item?.sku,
  //           item_name: item?.name || "Unknown Item",
  //           quantity: item?.quantity || 1,
  //           price: item?.price || 0,
  //           item_variant: item?.variant_name || undefined,
  //         })) || [],
  //     });

  //     console.log("✅ Google Analytics purchase event fired!", {
  //       transaction_id: orderSummary?.order_id || "UNKNOWN",
  //       value: orderSummary?.order_summary?.total_amount || 0,
  //       items_count: orderSummary?.items?.length || 0,
  //     });

  //     hasTracked.current = true;
  //   } else if (!hasTracked.current) {
  //     console.log("⚠️ purchase event NOT fired - conditions not met", {
  //       hasTracked: hasTracked.current,
  //       orderStatus: orderSummary?.payment_status,
  //       gtagAvailable:
  //         typeof window !== "undefined" && typeof window.gtag !== "undefined",
  //     });
  //   }
  // }, [orderSummary]);

  return (
    <div className="w-full">
      <div
        ref={invoiceRef}
        className="space-y-4 w-full bg-gray-100 mt-4 rounded p-4"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-normal text-gray-700">Order ID:</h2>
          <p className="text-sm text-gray-600">#{orderSummary?.order_id}</p>
        </div>

        <h2 className="text-lg font-normal text-gray-700">Order Summary</h2>

        <div className="space-y-2">
          {orderSummary.items.map((item: any, index: number) => (
            <div key={index} className="flex bg-white p-2 items-center gap-2">
              <div className="h-12 w-11 overflow-hidden rounded">
                <ImageWithFallback
                  src={`${process.env.BACKBLAZE_URL}/${item?.variant_image[0]}`}
                  alt={item?.name || "Product Image"}
                  className="object-cover h-full w-full"
                  height={50}
                  width={50}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-templateText tracking-wide">
                  {item?.name}
                </h4>
                <div className="text-xs text-gray-400 tracking-wide font-medium">
                  {item?.variant_name && <span>{item.variant_name} x </span>}
                  <span>
                    {item.quantity} {item.quantity > 1 ? "units" : "unit"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr />

        {[
          { label: "Subtotal", value: orderSummary?.order_summary?.subtotal },
          {
            label: "Discount",
            value: orderSummary?.order_summary?.discount_amount,
          },
          {
            label: "Shipping Charges",
            value: orderSummary?.order_summary?.shhipping_amount,
          },
          { label: "Taxes", value: orderSummary?.order_summary?.taxes },
        ].map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-700">
            <p>{item.label}</p>
            <p>{item.value ? formatAmount(item.value) : "-"}</p>
          </div>
        ))}

        <hr />

        <div className="flex justify-between text-lg text-gray-700">
          <p>Total</p>
          <p>{formatAmount(orderSummary?.order_summary?.total_amount)}</p>
        </div>

        <div className="flex justify-between  text-lg items-center text-gray-700">
          <p className="">Payment Status</p>
          <Tag
            color={
              orderSummary?.payment_status.toLowerCase() === "paid"
                ? "green"
                : "red"
            }
          >
            {orderSummary?.payment_status}
          </Tag>
        </div>

        <hr />
        <div className="flex justify-center gap-2 w-full mt-4">
          <a href={"/"}>
            <Button
              variant="default"
              className="text-sm tracking-wide font-normal"
            >
              Continue Shopping
            </Button>
          </a>
          {token && (
            <a href={"/account?tab=orders"}>
              <Button
                variant="outline"
                className="text-sm tracking-wide font-normal"
              >
                My Orders
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterOrderPlaced;
