"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Check, Loader2Icon, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartDrawer } from "@/store/slice/CartToggle";
import Link from "next/link";
import { RootState } from "@/store/store";
import { incrementCartTotal } from "@/store/slice/cartTotalSlice";

interface Props {
  preOrder?: boolean;
  productData: {
    id: number;
    name: string;
    slug: string;
    isVariantProduct: boolean;
    variants: {}[];
    stock?: number;
    gallery: { url: string; alt: string }[];
    regularPrice: number;
    sellingPrice: number;
    combination?: string; // Assume combination is a string or identifier
  };
  dark: boolean;
  disabled?: boolean;
  quickView?: boolean;
  floating?: boolean;
}

const ATC: React.FC<Props> = ({
  preOrder,
  productData,
  dark,
  disabled,
  quickView,
  floating = false,
}) => {
  const [localInCart, setLocalInCart] = useState<Number | null>(null);
  const [added, setAdded] = useState(false);
  const isLogged = Cookies.get(process.env.AUTH_TOKEN!);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );

  const reStructuredProductData = {
    id: productData.id,
    stock: productData?.stock,
    title: productData.name,
    image: productData.gallery[0],
    regularPrice: productData.regularPrice,
    sellingPrice: productData.sellingPrice,
    slug: productData.slug,
    isVariantProduct: productData.isVariantProduct,
    // variants: productData.variants,
    combination: productData.combination || null,
  };

  const handleCart = () => {
    const requestData = {
      customer_id: storedCustomerData?.customer_id,
      cart_id: null,
      item_id: productData?.id,
      price: 0,
      quantity: 1,
      operation: "add",
      combination: productData.combination || null,
    };
    if (isLogged) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch(
            `${process.env.BACKEND}/api/cart/manage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_KEY}`,
              },
              body: JSON.stringify(requestData),
            }
          );
          const result = await response.json();
          if (!response.ok) {
            console.error("Error updating cart", result.error);
          } else {
            if (quickView) {
              setAdded(true);
            } else {
              dispatch(toggleCartDrawer());
            }
            dispatch(incrementCartTotal(1));
            setLoading(false);
            setLocalInCart(productData?.id);
          }
        } catch (error) {
          console.error(error, "Internal Server Error");
        } finally {
          setLoading(false);
        }
      }, 500);
    } else {
      setLoading(true);

      // console.log("Locally");

      setTimeout(() => {
        try {
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );

          const productIndex = guestCart.findIndex(
            (item: { id: number; combination?: string }) =>
              item.id === reStructuredProductData.id &&
              item.combination === reStructuredProductData.combination
          );

          const existingQty =
            productIndex !== -1 ? guestCart[productIndex].quantity : 0;
          const totalQty = existingQty + 1;

          if (totalQty > productData.stock!) {
            toast.error(`Already in the cart`);
            setLoading(false);
            dispatch(toggleCartDrawer());
            return;
          }

          if (productIndex !== -1) {
            guestCart[productIndex].quantity += 1;
          } else {
            guestCart.push({ ...reStructuredProductData, quantity: 1 });
          }

          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          if (quickView) {
            setAdded(true);
          } else {
            dispatch(toggleCartDrawer());
          }
          toast.success("Product added to cart");
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      }, 500);
    }
  };

  return (
    <>
      {floating ? (
        <>
          {localInCart === productData?.id ? (
            <div className=" flex items-center justify-center w-full">
              <div className="px-5 cursor-pointer text-xs hover:scale-90 duration-300 transition-all ease-in-out tracking-wide flex items-center gap-2 py-2 bg-black text-white rounded-full">
                <Check color="white" size={18} /> In cart
              </div>
            </div>
          ) : (
            <button
              disabled={disabled}
              onClick={!disabled ? handleCart : undefined}
              className={`px-5 cursor-pointer ${
                floating && "text-xs"
              }  duration-300 transition-all ease-in-out tracking-wide flex items-center gap-2 py-2 bg-black text-white rounded-full ${
                disabled
                  ? "!cursor-not-allowed"
                  : "cursor-pointer hover:scale-90"
              }`}
            >
              {loading && <Loader2Icon size={14} className="animate-spin" />}
              {!disabled ? "Buy Now" : "Out of stock"}
              {!disabled ? <ShoppingCart size={14} /> : null}
            </button>
          )}
        </>
      ) : (
        <>
          {localInCart === productData?.id ? (
            <div className="w-full space-y-2">
              <button
                disabled={disabled}
                className={`
                  cursor-not-allowed opacity-90 border-templateText bg-templatePrimary text-templatePrimaryText  flex items-center justify-center w-full gap-2 border py-3 hover:opacity-90 text-sm tracking-wide font-medium`}
              >
                <Check color="white" size={18} /> In cart
              </button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <button
                disabled={disabled}
                onClick={!disabled ? handleCart : undefined}
                className={`${
                  disabled ? "cursor-not-allowed opacity-90" : "cursor-pointer"
                } ${
                  !dark
                    ? "border-templateText bg-templatePrimary text-templatePrimaryText"
                    : "border-templateText bg-templateText text-white"
                } flex items-center justify-center w-full gap-2 border py-3 hover:opacity-90 text-sm tracking-wide font-medium`}
              >
                {loading && <Loader2Icon size={14} className="animate-spin" />}
                {!disabled
                  ? `Buy Now ${preOrder ? "- On Pre-Order" : ""}`
                  : "Out of stock"}
              </button>
              {quickView && added ? (
                <Link href={"/cart"} className="block underline">
                  <span className="text-green-600 tracking-wide font-semibold text-xs">
                    Added!! View cart
                  </span>
                </Link>
              ) : null}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ATC;
