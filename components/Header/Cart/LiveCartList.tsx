import { Loader2, LoaderCircle, Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { clearCartTotal } from "@/store/slice/cartTotalSlice";
import { useFormatAmount } from "@/hooks/useFormatAmount";
interface LiveCartListProps {
  loading: boolean;
}

const LiveCartList: React.FC<LiveCartListProps> = ({ loading }) => {
  const { formatAmount } = useFormatAmount();
  const [removing, setRemoving] = useState(false);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cartItem);
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    window.location.href = "/checkout";
  };

  const handleRemoveAll = async () => {
    setRemoving(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/delete_all_item`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Authorization-Customer": `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to remove all items");
        toast.error("Failed to remove all items");
      } else {
        toast.success("All Items Removed!");
        // console.log(result);
        dispatch(setCartItems({ items: [], grandTotal: 0 }));
        dispatch(clearCartTotal());
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error("Internal Server Error", error);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col space-y-0 justify-between h-full w-full">
      {/* Cart Header */}
      <div className="flex items-center justify-between border-b p-5 w-full">
        <h2 className="text-templateText">Your Cart</h2>
      </div>

      {/* Cart Items */}
      {removing || loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="h-full relative overflow-y-auto w-full">
          {cartItem?.items?.length > 0 && (
            <div className="flex items-center justify-end p-2">
              <button
                onClick={handleRemoveAll}
                className="flex gap-1 items-center bg-gray-100 rounded text-xs tracking-wide px-2 py-1"
              >
                <X size={14} color="gray" />
                Remove all
              </button>
            </div>
          )}
          {cartItem?.items?.map((item: any, index: number) => (
            <div className="last:border-none border-b" key={index}>
              <CartCard item={item} />
            </div>
          ))}
        </div>
      )}

      {/* Cart Footer */}
      <div className="border-t w-full flex flex-col space-y-4 items-center justify-between p-5">
        {/* Subtotal */}
        <div className="flex items-center w-full justify-between">
          <h2 className="text-templateText">SUBTOTAL</h2>
          <h2 className="text-templateText text-lg font-semibold">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>{formatAmount(Number(cartItem?.grandTotal))}</>
            )}
          </h2>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-center text-gray-500">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="bg-templateText flex items-center justify-center gap-1 hover:opacity-90 tracking-wider text-white w-full py-2.5 rounded-full"
        >
          {checkingOut && (
            <LoaderCircle size={20} className="animate-spin" strokeWidth={1} />
          )}
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default LiveCartList;
