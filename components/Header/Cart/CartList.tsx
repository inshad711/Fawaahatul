"use client";
import { toggleCartUpdated } from "@/store/slice/CartToggle";
import { Loader2, LoaderCircle, Minus, Plus, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ImageWithFallback from "@/components/Image/Fallbackimage";
import { useFormatAmount } from "@/hooks/useFormatAmount";
interface CartListProps {
  cartData: {
    id: number;
    name: string;
    image: { url: string; alt: string };
    quantity: number;
    regularPrice: number;
    sellingPrice: number;
    title: string;
    combination: string;
    slug: string;
    stock: number;
  }[];
  fetchCartData: any;
}

const CartList: React.FC<CartListProps> = ({ cartData, fetchCartData }) => {
  const { formatAmount } = useFormatAmount();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateCartInLocalStorage = (updatedCart: any[]) => {
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    dispatch(toggleCartUpdated());
  };

  const incrementQuantity = (productId: number, combination?: string) => {
    setUpdating(true);
    setTimeout(() => {
      const updatedCart = cartData.map((item) =>
        item?.id === productId && item?.combination === combination
          ? { ...item, quantity: item?.quantity + 1 }
          : item
      );

      updateCartInLocalStorage(updatedCart);
      setUpdating(false);
    }, 300);
  };

  const decrementQuantity = (productId: number, combination?: string) => {
    setUpdating(true);
    setTimeout(() => {
      const updatedCart = cartData.map((item) =>
        item?.id === productId && item?.combination === combination
          ? { ...item, quantity: item?.quantity - 1 }
          : item
      );

      const filteredCart = updatedCart.filter((item) => item?.quantity > 0);

      if (filteredCart.length < updatedCart.length) {
        if (confirm("Do you want to remove this item from the cart?")) {
          updateCartInLocalStorage(filteredCart);
        }
      } else {
        updateCartInLocalStorage(filteredCart);
      }

      setUpdating(false);
    }, 100);
  };

  const calculateTotalValue = () => {
    return cartData.reduce(
      (total, item) => total + item?.sellingPrice * item?.quantity,
      0
    );
  };

  const handleRemoveAll = () => {
    localStorage.removeItem("guestCart");
    fetchCartData();
  };

  return (
    <div className="flex flex-col space-y-0 justify-between h-full w-full">
      <div className="flex items-center justify-between border-b p-5 w-full">
        <h2 className="text-templateText">Your Cart</h2>
      </div>

      <div className="h-full relative overflow-y-auto w-full">
        {cartData.length > 0 && (
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
        <div>
          {cartData.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 hover:bg-gray-50 py-3 px-5 group"
            >
              <div className="h-[70px] border w-[70px] overflow-hidden">
                <ImageWithFallback
                  src={
                    item?.image?.url
                      ? `${process.env.BACKBLAZE_URL}/${item.image.url}`
                      : "/placeholder.webp"
                  }
                  alt={item?.image?.alt || "Product Image"}
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
                  {/* Quantity Controls */}
                  <div className="flex items-center border w-auto p-1 bg-white">
                    {/* Decrement Button */}
                    <div
                      onClick={() =>
                        decrementQuantity(item?.id, item?.combination)
                      }
                      className="flex items-center cursor-pointer justify-center hover:text-templatePrimary"
                    >
                      {item?.quantity <= 1 ? (
                        <Trash size={14} />
                      ) : (
                        <Minus size={14} />
                      )}
                    </div>

                    <span className="w-10 text-center text-sm h-full text-templateText">
                      {item?.quantity}
                    </span>

                    {/* Increment Button */}
                    <div
                      onClick={() => {
                        if (item?.quantity < item.stock) {
                          incrementQuantity(item?.id, item?.combination);
                        }
                      }}
                      className={`flex items-center justify-center ${
                        item.quantity < item.stock
                          ? "cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Plus size={14} />
                    </div>
                  </div>

                  {/* Product Prices */}
                  <div className="flex items-center gap-2">
                    <h2 className="text-gray-500 line-through text-xs">
                      {formatAmount(item?.regularPrice)}
                    </h2>
                    <h2 className="text-templateText text-sm">
                      {formatAmount(item?.sellingPrice)}
                    </h2>
                  </div>
                </div>
              </div>
              {updating && (
                <div className="flex items-center justify-center border-b absolute inset-0 bg-white/20 ">
                  <Loader2 className="animate-spin" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && (
          <div className="absolute bg-white/20 inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>

      {/* Cart Footer */}
      <div className="border-t w-full flex flex-col space-y-4 items-center justify-between p-5">
        {/* Subtotal */}
        <div className="flex items-center w-full justify-between">
          <h2 className="text-templateText">SUBTOTAL</h2>
          <h2 className="text-templateText text-lg font-semibold">
            {formatAmount(calculateTotalValue())}
          </h2>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-center text-gray-500">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>

        {/* Checkout Button */}
        <a
          href={"/checkout"}
          className="block w-full active:scale-95 duration-200 transition-all ease-in-out"
        >
          <button className="bg-templateText flex items-center justify-center gap-1 hover:opacity-90 tracking-wider text-white w-full py-2.5 rounded-full">
            {loading && (
              <LoaderCircle
                size={20}
                className="animate-spin"
                strokeWidth={1}
              />
            )}
            CHECKOUT
          </button>
        </a>
      </div>
    </div>
  );
};

export default CartList;
