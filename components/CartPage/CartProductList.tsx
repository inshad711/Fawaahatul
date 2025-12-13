"use client";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { cartService } from "@/services/cartService";
import toast from "react-hot-toast";

interface Props {
  cartData: {
    cart_id: number;
    title: string;
    itemTotal: number;
    quantity: number;
    sellingPrice: number;
    image: {
      url: string;
      alt: string;
    };
  };
  setRefetch: (refetch: boolean) => void;
}

const CartProductList: React.FC<Props> = ({ cartData, setRefetch }) => {
  const { formatAmount } = useFormatAmount();
  const totalAmount = cartData?.quantity * cartData?.sellingPrice;

  const handleItemRemove = async () => {
    // console.log("remove item", cartData.cart_id);
    const response = await cartService.removeSingleItemFromCart(
      cartData.cart_id
    );
    if (response.success) {
      // console.log("response", response);
      setRefetch(true);
    } else {
      console.error("error", response);
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-[40%,20%,20%,20%] gap-2 py-5 border-b">
      <div className="flex  col-span-2 lg:col-span-1 items-center gap-3">
        <div className="h-[70px] w-[60px] overflow-hidden">
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${cartData?.image?.url}`}
            alt={cartData?.image?.alt || "Product Image"}
            sizes="70px"
            className="h-full w-full object-cover "
            height={65}
            width={55}
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-[15px] lg:text-[16px] group-hover:text-templatePrimary tracking-wider">
            {cartData?.title}
          </h2>
        </div>
      </div>
      <div className="hidden  lg:flex items-center justify-end">
        <span className="text-right">
          {formatAmount(Number(cartData?.sellingPrice))}
        </span>
      </div>
      <div className="flex items-center justify-start lg:justify-end">
        <div className="flex items-center  w-auto">
          {/* <div
            onClick={decrement}
            className="h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-300"
          >
            <Minus size={15} />
          </div> */}

          <span className="px-3 text-center text-sm h-full">
            x{cartData?.quantity}
          </span>

          {/* <div
            onClick={increment}
            className="h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-300"
          >
            <Plus size={15} />
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-end lg:justify-end gap-4">
        <span className="text-right">{formatAmount(totalAmount)}</span>
        <Trash2
          onClick={handleItemRemove}
          size={20}
          color="red"
          strokeWidth={1}
          className="cursor-pointer hover:scale-110 transition-all ease"
        />
      </div>
    </div>
  );
};

export default CartProductList;
