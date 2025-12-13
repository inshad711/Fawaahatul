"use client";
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ImageWithFallback from "@/components/Image/Fallbackimage";
import {
  decrementCartTotal,
  incrementCartTotal,
} from "@/store/slice/cartTotalSlice";
import { toggleCartUpdated } from "@/store/slice/CartToggle";
import { removeItem, updateItemQuantity } from "@/store/slice/cartItemSlice";
import { useFormatAmount } from "@/hooks/useFormatAmount";
interface Props {
  item: any;
}

const CartCard: React.FC<Props> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const { formatAmount } = useFormatAmount();
  const dispatch = useDispatch();
  const customerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );

  const handleCartOperation = async (item: any, operation: string) => {
    setLoading(true);

    const isIncrement = operation === "increment";
    const isDecrement = operation === "decrement";
    const isRemove = operation === "remove";

    // Update Redux state first for a more responsive UI
    if (isIncrement) {
      if (item.quantity >= item.available_inventory) {
        // Already at max stock, do nothing
        setLoading(false);
        return;
      }
      dispatch(
        updateItemQuantity({ id: item.id, quantity: item.quantity + 1 })
      );
      dispatch(incrementCartTotal(1));
    }

    if (isDecrement && item.quantity > 1) {
      dispatch(
        updateItemQuantity({ id: item.id, quantity: item.quantity - 1 })
      );
      dispatch(decrementCartTotal(1));
    }

    if (isRemove || (isDecrement && item.quantity === 1)) {
      dispatch(removeItem(item.id));
      dispatch(decrementCartTotal(item.quantity)); // Remove the entire quantity from the total
    }

    const requestData = {
      customer_id: customerData?.customer_id,
      cart_id: item.cart_id,
      item_id: item.id,
      variation_name: item.variation_name,
      quantity:
        operation === "increment"
          ? item.quantity + 1
          : operation === "decrement"
          ? item.quantity - 1
          : item.quantity,
      price: 0,
      operation,
    };

    try {
      const response = await fetch(`${process.env.BACKEND}/api/cart/manage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify(requestData),
      });

      const errorResult = await response.json();
      if (!response.ok) {
        console.error("Error updating cart", errorResult.error);
      } else {
        setLoading(false);
        // console.log(errorResult, "errorResult");
        // dispatch(toggleCartUpdated());
      }
    } catch (error) {
      console.error("Internal Server Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative gap-2  hover:bg-gray-50 py-3 px-5 group">
      <div className="h-[70px] border w-[65px] overflow-hidden">
        <ImageWithFallback
          src={`${process.env.BACKBLAZE_URL}/${item?.image.url}`}
          alt={item?.image.alt || "Product Image"}
          sizes="70px"
          className="h-full w-full object-cover"
          height={65}
          width={55}
        />
      </div>
      <div className="w-full my-auto space-y-2.5">
        <h2 className="tracking-wide text-[13px] line-clamp-1 leading-tight text-templateText">
          {item?.title}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center border w-auto p-1 bg-white">
            <div className="flex items-center cursor-pointer justify-center hover:text-templatePrimary">
              {item?.quantity <= 1 ? (
                <Trash
                  onClick={() => handleCartOperation(item, "remove")}
                  size={14}
                />
              ) : (
                <Minus
                  onClick={() => handleCartOperation(item, "decrement")}
                  size={14}
                />
              )}
            </div>

            <span className="w-10 text-center text-sm h-full text-templateText">
              {item?.quantity}
            </span>

            {item?.quantity < item?.available_inventory && (
              <div
                onClick={() => handleCartOperation(item, "increment")}
                className="flex cursor-pointer items-center justify-center"
              >
                <Plus size={14} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-gray-500 line-through text-xs">
              {formatAmount(Number(item?.regularPrice))}
            </h2>
            <h2 className="text-templateText text-sm">
              {formatAmount(Number(item?.sellingPrice))}
            </h2>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center border-b absolute inset-0 bg-white/50 ">
          <Loader2 className="animate-spin" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};

export default CartCard;
