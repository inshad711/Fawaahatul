"use client";
import Image from "next/image";
import React, { useState } from "react";
import CheckoutPageSkeleton from "../Skeletons/CheckoutPageSkeleton";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartDrawer } from "@/store/slice/CartToggle";
import { RootState } from "@/store/store";
import CheckoutCart from "./CheckoutCart";
import EmailPhoneVerify from "../NewCheckout/EmailPhoneVerify";
import CheckoutShippingAddress from "../NewCheckout/CheckoutShippingAddress";
import NewPaymentMethod from "../NewCheckout/NewPaymentMethod";
import PayButton from "./PayButton";
import {
  clearCheckout,
  setCartData,
  setCustomerData,
  updateCartData,
} from "@/store/slice/CheckoutPage/checkoutSlice";
import {
  setProcessingOrder,
  setShowShippingAddress,
} from "@/store/slice/CheckoutPage/checkoutToggle";
import ProductUpsell from "../Cards/ProductUpsell";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import AfterOrderPlaced from "./AfterOrderPlaced";
import confetti from "canvas-confetti";
import { calculateInternationalShipping } from "@/utils/constants";
import EmailContactVerify from "./EmailContactVerify";
import { cartService } from "@/services/cartService";
import OnlyEmailVerify from "../NewCheckout/OnlyEmailVerify";
import Link from "next/link";
import StripePayment from "./StripePayment";

const CheckoutPage = () => {
  const router = useRouter();
  const isValidated = useSelector((state: RootState) => state.toggle.validated);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const dispatch = useDispatch();
  const [savedToAbandonedCart, setSavedToAbandonedCart] = useState(false);
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  const {
    showPaymentMethod,
    showShippingAddress,
    processingOrder,
    orderPlacedSuccessfully,
    processingMessage,
  } = useSelector((state: RootState) => state.checkoutToggle);
  const { selectedPaymentMethod, cartData, shippingRate } = useSelector(
    (state: RootState) => state.newCheckout
  );

  const MIN_AMOUNT_FOR_FREE_SHIPPING =
    process.env.MIN_AMOUNT_FOR_FREE_SHIPPING || null;

  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);

  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );

  const { recommendedProducts } = useSelector(
    (state: RootState) => state.recommended
  );

  const { orderSummary } = useSelector(
    (state: RootState) => state.orderSummary
  );

  useEffect(() => {
    if (isValidated) {
      if (token && storedCustomerData) {
        const requestedData = {
          email: storedCustomerData?.email,
          type: "user",
        };
        dispatch(setCustomerData(requestedData));
        dispatch(setShowShippingAddress(true));
        setLoading(false);
      } else {
        const guestCartData = JSON.parse(
          localStorage.getItem("guestCart") || "[]"
        );
        if (guestCartData.length <= 0) {
          router.push("/");
        } else {
          setLoading(false);
        }
      }
    }
  }, [pathname, router, storedCustomerData, isValidated]);

  const showConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const totalItems = cartData?.cartItems
    ?.filter((item: any) => item.inStock)
    .reduce((acc: number, item: any) => acc + item.quantity, 0);

  // useEffect(() => {
  //   const currentAmount = Number(cartData.totalTaxableAmount);
  //   if (currentAmount >= Number(MIN_AMOUNT_FOR_FREE_SHIPPING)) {
  //     dispatch(
  //       updateCartData({
  //         totalTaxableAmount: currentAmount,
  //       })
  //     );
  //   } else if (shippingRate?.flatRate != null) {
  //     dispatch(
  //       updateCartData({
  //         totalTaxableAmount:
  //           Number(cartData.totalAmount) +
  //           Number(
  //             geoLocation?.countryName?.toLocaleLowerCase() === "india"
  //               ? shippingRate.flatRate
  //               : calculateInternationalShipping(totalItems, globalSetting)
  //           ),
  //       })
  //     );
  //   }
  // }, [shippingRate, cartData.cartItems]);

  // useEffect(() => {
  //   if (shippingRate?.flatRate != null) {
  //     dispatch(
  //       updateCartData({
  //         totalTaxableAmount:
  //           Number(cartData.totalAmount) +
  //           Number(
  //             geoLocation?.countryName?.toLocaleLowerCase() === "india"
  //               ? shippingRate.flatRate
  //               : calculateInternationalShipping(totalItems, globalSetting)
  //           ),
  //       })
  //     );
  //   }
  // }, [shippingRate, cartData.cartItems]);

  useEffect(() => {
    if (orderPlacedSuccessfully) {
      showConfetti();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderPlacedSuccessfully]);

  const manageAbandonedCart = async () => {
    const updatedCartItems = cartData?.cartItems?.map((item: any) => ({
      ...item,
      currency: geoLocation?.currency || "",
    }));
    try {
      const response = await cartService.manageAbandonedCart(
        updatedCartItems,
        cartData.totalAmount,
        "website"
      );
      if (response.success) {
        setSavedToAbandonedCart(true);
        const abandonedCartId = localStorage.getItem("abandonedCartId");
        if (abandonedCartId) {
          localStorage.removeItem("abandonedCartId");
        }
        localStorage.setItem(
          "abandonedCartId",
          JSON.stringify(response.data.id)
        );
      }
    } catch (error) {
      console.error("Error managing abandoned cart:", error);
    }
  };

  useEffect(() => {
    if (
      cartData.cartItems.length > 0 &&
      !savedToAbandonedCart &&
      storedCustomerData
    ) {
      manageAbandonedCart();
    }
  }, [cartData.cartItems, storedCustomerData]);

  if (isValidated)
    return (
      <>
        {orderPlacedSuccessfully ? (
          <div className="bg-gray-100 lg:min-h-screen">
            <div className="max-w-[580px] mx-auto lg:py-6 w-full">
              <div className="flex flex-col bg-white gap-1 w-full shadow-2xl rounded px-5 lg:px-10 py-6 items-center justify-center">
                <Image
                  src="/assets/logos/orderPlaced.png"
                  alt="Order placed"
                  className="w-24 h-24 object-contain"
                  width={300}
                  height={300}
                />
                <h1 className="text-3xl text-green-600 tracking-wide">
                  Thank you for your order
                </h1>
                <p className="text-sm text-center text-gray-500 tracking-wide">
                  Your order has been placed successfully. You can view your
                  order summary below.
                </p>
                {orderSummary.map((item: any, index: any) => (
                  <div className="w-full" key={index}>
                    <AfterOrderPlaced orderSummary={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              {loading ? (
                <CheckoutPageSkeleton />
              ) : (
                <div className="container mx-auto px-0 md:px-6 lg:px-20 w-full flex flex-col-reverse lg:flex-row py-4 gap-2 lg:gap-8 md:py-6 lg:py-8">
                  <div className="px-5 w-full lg:w-[57%] lg:border-r border-gray-200 lg:pr-10 h-full space-y-4 lg:space-y-6">
                    <Link
                      href={"/"}
                      className="block gap-4 flex-col items-center justify-center"
                    >
                      <Image
                        src={`/assets/perfumeImage/fawaahlogo.webp`}
                        className="hidden lg:block w-20 h-auto object-contain"
                        alt={
                          `${globalSetting?.logoSettings?.altText}` || "Logo"
                        }
                        height={100}
                        width={200}
                      />
                    </Link>

                    <div>
                      <button
                        onClick={() => router.back()}
                        className="flex items-center text-templateText gap-2 text-sm hover:underline underline-offset-4"
                      >
                        <ArrowLeft size={14} strokeWidth={1.5} /> Go Back
                      </button>
                    </div>

                    <OnlyEmailVerify />
                    {/* <EmailPhoneVerify /> */}
                    {showShippingAddress && <CheckoutShippingAddress />}
                    {/* {true && <CheckoutShippingAddress />} */}
                    {/* {true && <NewShippingMethod />} */}
                    {/* {showPaymentMethod && <NewPaymentMethod />} */}
                    {showPaymentMethod && <StripePayment />}
                    {/* {true && <NewPaymentMethod />} */}
                    {/* {selectedPaymentMethod && <PayButton />} */}
                    {/* {selectedPaymentMethod && <StripePayment />} */}
                  </div>
                  <div className="w-full space-y-0 lg:space-y-5 lg:w-[43%] lg:sticky top-8 h-full xl:pl-10">
                    <div className="flex items-center justify-center lg:hidden">
                      <Image
                        src={`/assets/perfumeImage/fawaahlogo.webp`}
                        className="w-36 h-auto object-contain"
                        alt={
                          `${globalSetting?.logoSettings?.altText}` || "Logo"
                        }
                        height={500}
                        width={200}
                      />
                    </div>
                    <CheckoutCart />
                  </div>
                </div>
              )}
            </div>

            {recommendedProducts && recommendedProducts.length > 0 && (
              <>
                <div className="w-full templateContainer">
                  <hr />
                </div>

                <div className="templateContainer pb-6 md:pb-8 lg:pb-14 w-full">
                  <ProductUpsell recommendedProducts={recommendedProducts} />
                </div>
              </>
            )}
          </div>
        )}

        <div
          className={`
    fixed inset-0 backdrop-blur-sm bg-black/55 z-[999999999999] flex items-center justify-center 
    transition-all duration-300 ease-in-out 
    ${
      processingOrder
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-110 pointer-events-none"
    }
  `}
        >
          <div className="flex flex-col items-center gap-2 text-white">
            <Loader2Icon size={60} className="animate-spin" strokeWidth={1} />
            <p className="font-sans tracking-wide font-semibold">
              {processingMessage || "Processing your order..."}
            </p>
          </div>
        </div>
      </>
    );
};

export default CheckoutPage;
