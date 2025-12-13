"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import Cookies from "js-cookie";
import { Empty, Modal } from "antd";
import ShippingPolicy from "../Policies/ShippingPolicy";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "@/store/slice/checkoutCartSlice";
import { RootState, store } from "@/store/store";
import { setCartItemsCheckout, setTotalAmount } from "@/store/slice/sCheckout";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import OptionModal from "./OptionModal";
import NewCheckoutCartCard from "./NewCheckoutCartCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RenderCartDetails from "./RenderCartDetails";
import { cartService } from "@/services/cartService";
import { setCartData } from "@/store/slice/CheckoutPage/checkoutSlice";
import { setRecommendedProducts } from "@/store/slice/recommendedSlice";
import { calculateInternationalShipping } from "@/utils/constants";

const CheckoutCart: React.FC = () => {
  const { shippingAddress, formErrors } = useSelector(
    (state: RootState) => state.newCheckout
  );
  const [loading, setLoading] = useState(true);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const [openSummary, setOpenSummary] = useState(false);
  const dispatch = useDispatch();
  const { formatAmount } = useFormatAmount();
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );

  const { cartData, shippingRate } = useSelector(
    (state: RootState) => state.newCheckout
  );

  const fetchCartItems = async () => {
    if (token) {
      // Fetch cart items from backend
      setLoading(true);
      try {
        const res = await cartService.getUserCartData(
          storedCustomerData?.customer_id
        );

        if (res.success) {
          dispatch(
            setCartData({
              cart: res.data,
              totalDiscount: "",
              discount_value: 0,
              discountType: "",
              totalAmount: res.totalAmount || 0,
              totalTax: res.totalTax || 0,
              totalTaxableAmount: res.totalTaxableAmount || 0,
            })
          );
          dispatch(setRecommendedProducts(res.upsellAndRecommended || []));
        }
      } catch (error) {
        console.error("Error fetching logged-in cart data:", error);
        return [];
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);

      const guestCartData = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );

      const requestedData = guestCartData.map((item: any) => {
        return {
          id: item.id,
          name: item.title,
          quantity: item.quantity,
          combination: item.combination || null,
        };
      });

      try {
        const res = await cartService.validateCart({
          cartItems: requestedData,
        });

        if (res.success) {
          const updatedCart = guestCartData.map((item: any) => {
            const validatedItem = res.data.find(
              (validated: any) => validated.id === item.id
            );
            return validatedItem ? { ...item, ...validatedItem } : item;
          });

          // Save to local storage
          localStorage.setItem("guestCart", JSON.stringify(updatedCart));

          // Dispatch to Redux store
          dispatch(
            setCartData({
              cart: res.data,
              totalDiscount: "",
              discount_value: 0,
              discountType: "",
              totalAmount: res.totalAmount || 0,
              totalTax: res.totalTax || 0,
              totalTaxableAmount: res.totalTaxableAmount || 0,
            })
          );
          dispatch(setRecommendedProducts(res.upsellAndRecommended || []));
        }
      } catch (error) {
        console.error("Error fetching guest cart data", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token, storedCustomerData]);

  if (cartData?.cartItems?.length < 0) {
    return (
      <div>
        <Empty />
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        {loading ? (
          <div className="space-y-6">
            {Array(4)
              .fill(4)
              .map((_, index) => (
                <div key={index} className="flex  items-center justify-between">
                  <div className="flex w-full items-center gap-4">
                    <div className="animate-pulse h-16 w-20 rounded bg-gray-200 "></div>
                    <div className="w-full space-y-2">
                      <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
          </div>
        ) : (
          <RenderCartDetails />
        )}
      </div>
      <div className="lg:hidden">
        <div
          onClick={() => setOpenSummary(true)}
          className="border-y rounded-t-lg fixed bottom-0 left-0 w-full tracking-wide bg-gray-100 flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-1">
            <span>Order summary</span>
            <ChevronUp size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {formatAmount(Number(cartData?.totalTaxableAmount))}
            </h2>
          </div>
        </div>
        <div
          onClick={() => setOpenSummary(false)}
          className={`fixed bg-black/50 duration-300 top-0 left-0 inset-0 ${
            openSummary ? "translate-y-0" : "translate-y-full"
          }`}
        ></div>
        <div
          className={` w-full space-y-2 pt-4 pb-2 bg-templateBackground duration-300 rounded-t-2xl fixed bottom-0 left-0 border-t ${
            openSummary ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <h2 className="text-center text-lg font-medium text-templateText">
            Order Summary
          </h2>
          <RenderCartDetails />
        </div>
      </div>
      {/* <OptionModal /> */}
    </>
  );
};

export default CheckoutCart;
