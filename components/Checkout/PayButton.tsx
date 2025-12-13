import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { razorpayPayment } from "@/lib/gateway";
import Cookies from "js-cookie";
import { Loader2Icon, LoaderIcon, TriangleAlert } from "lucide-react";
import { Modal } from "antd";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import toast from "react-hot-toast";
import { ShippingAddress } from "@/types/checkout";
import {
  clearCheckout,
  setFormErrors,
  updateCartData,
} from "@/store/slice/CheckoutPage/checkoutSlice";
import { checkoutService } from "@/services/checkoutService";
import {
  setOptionModal,
  setOrderPlacedSuccessfully,
  setProcessingOrder,
} from "@/store/slice/CheckoutPage/checkoutToggle";
import Link from "next/link";
import axios from "axios";
import { cashfreePayment } from "@/lib/cashfreeGateway";
import { codPayment } from "@/lib/codGateway";
import { setOrderSummary } from "@/store/slice/CheckoutPage/orderSummary";
import { calculateInternationalShipping } from "@/utils/constants";
import { useFormatAmount } from "@/hooks/useFormatAmount";

interface Props {
  text?: string;
}

const PayButton: React.FC<Props> = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [cartError, setCartError] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const { formatAmount, convertAmount } = useFormatAmount();
  const dispatch = useDispatch();
  const {
    paymentMethod,
    selectedPaymentMethod,
    customerData,
    shippingAddress,
    shippingMethod,
    shippingRate,
    internalShippingRate,
    cartData,
  } = useSelector((state: RootState) => state.newCheckout);

  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);

  const MIN_AMOUNT_FOR_FREE_SHIPPING =
    process.env.MIN_AMOUNT_FOR_FREE_SHIPPING || null;

  const { processingOrder } = useSelector(
    (state: RootState) => state.checkoutToggle
  );

  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );

  const selectedMethod = paymentMethod?.find(
    (payment: any) => payment.value === selectedPaymentMethod
  );

  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validate customerData
    if (!customerData?.email && !customerData?.phone) {
      errors.contact = "Either email or phone is required.";
    }

    if (!customerData?.type) {
      errors.type = "User type is missing.";
    }

    // Validate shippingAddress fields (excluding 'country')
    const requiredShippingFields: (keyof ShippingAddress)[] = [
      "firstName",
      "address",
      "state",
      "city",
      "postalCode",
      "contactNumber",
    ];

    requiredShippingFields.forEach((field) => {
      const value = shippingAddress?.[field];
      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
      ) {
        errors[field] = `${field} is required.`;
      }
    });

    // Validate geoLocation.countryName
    if (!geoLocation?.countryName || geoLocation.countryName.trim() === "") {
      errors.country = "Country could not be determined.";
    }

    // Dispatch errors if any
    if (Object.keys(errors).length > 0) {
      dispatch(setFormErrors(errors));
      return false;
    }

    dispatch(setFormErrors({}));

    return true;
  };

  const totalItems = cartData?.cartItems
    ?.filter((item: any) => item.inStock)
    .reduce((acc: number, item: any) => acc + item.quantity, 0);

  const shippingAmount =
    geoLocation?.countryName?.toLocaleLowerCase() === "india"
      ? shippingRate?.flatRate
      : internalShippingRate?.flatRate;

  const summary = {
    texes: cartData.totalTax,
    subtotal: cartData.totalAmount,
    total_amount: cartData.totalTaxableAmount,
    discount_amount: cartData.totalDiscount,
    shipping_amount: shippingAmount || 0,
    paid_by_customer: cartData.totalTaxableAmount,
  };

  const codSummary = {
    texes: cartData.totalTax,
    subtotal: cartData.totalAmount,
    total_amount: cartData.totalTaxableAmount,
    discount_amount: cartData.totalDiscount,
    shipping_amount: shippingAmount || 0,
    paid_by_customer: 0,
  };

  const updateCartStockStatus = (
    originalCartItems: any[],
    validatedItems: any[]
  ) => {
    return originalCartItems.map((item) => {
      const validatedItem = validatedItems.find(
        (vi) => vi.id === item.id && vi.combination === item.combination
      );

      if (validatedItem) {
        return {
          ...item,
          inStock: validatedItem.isInStock,
        };
      }
      return item; // if no match, return original
    });
  };

  const shippingFee =
    cartData.totalTaxableAmount >= Number(MIN_AMOUNT_FOR_FREE_SHIPPING)
      ? 0
      : shippingAmount;

  console.log(selectedMethod?.credentials, 'selectedMethod?.credentials')
  const handleRazorpayPayment = async () => {
    const finalAmount = (
      convertAmount(Number(cartData.totalTaxableAmount)) +
      convertAmount(calculateInternationalShipping(totalItems, globalSetting))
    ).toFixed(2);

    const response: any = await razorpayPayment(
      geoLocation?.countryName?.toLocaleLowerCase() === "india"
        ? cartData.totalTaxableAmount
        : finalAmount,
      "",
      selectedMethod?.credentials,
      geoLocation?.countryName?.toLocaleLowerCase() === "india" ? "INR" : "USD",
      cartData.cartItems,
      token ? storedCustomerData : customerData,
      shippingAddress,
      shippingFee || 0,
      summary,
      "NOTES"
    );

    if (response.ok) {
      dispatch(setProcessingOrder(false));
      dispatch(setOrderPlacedSuccessfully(true));
      dispatch(setOrderSummary(response.orderResponse.summary.order));
      dispatch(clearCheckout());
      localStorage.removeItem("guestCart");
    } else {
      dispatch(setProcessingOrder(false));
      toast.error(`${response.error}`);
    }
  };

  const handleCashfreePayment = async () => {
    const finalAmount = (
      convertAmount(Number(cartData.totalTaxableAmount)) +
      convertAmount(calculateInternationalShipping(totalItems, globalSetting))
    ).toFixed(2);

    const result = await cashfreePayment(
      customerData?.type,
      cartData?.cartItems,
      token ? storedCustomerData : customerData,
      geoLocation?.countryName?.toLocaleLowerCase() === "india"
        ? cartData.totalTaxableAmount
        : finalAmount,
      {},
      shippingAddress,
      new Date().toISOString(),
      "Cashfree",
      false,
      false,
      cartData?.cartItems?.length,
      summary,
      geoLocation?.countryName?.toLocaleLowerCase() === "india" ? "INR" : "USD",
      "NOTES"
    );

    if (result?.status === "success") {
      setTimeout(() => {
        if ("summary" in result) {
          dispatch(setOrderSummary(result.summary));
        }
        dispatch(setProcessingOrder(false));
        dispatch(setOrderPlacedSuccessfully(true));
        dispatch(clearCheckout());
        localStorage.removeItem("guestCart");
      }, 1000);
    } else {
      // console.log("Payment Failed");
      setTimeout(() => {
        // setProcessing(false);
        // setLoading(false);
        dispatch(setProcessingOrder(false));
      }, 1000);
    }
  };

  const handleOnline = async () => {
    try {
      if (selectedMethod?.value === "razorpay") {
        handleRazorpayPayment();
      } else if (selectedMethod?.value === "cashfree") {
        handleCashfreePayment();
      }
    } catch (error) {
      console.error("Internal Server Error", error);
    }
  };

  const handleCODPayment = async () => {
    const response: any = await codPayment(
      { type: "COD" },
      cartData.cartItems,
      codSummary,
      cartData.totalTaxableAmount,
      token ? storedCustomerData : customerData,
      shippingAddress,
      "COD",
      "Unpaid",
      geoLocation?.countryName?.toLocaleLowerCase() === "india" ? "INR" : "USD",
      "NOTES"
    );
    if (response.success) {
      dispatch(setProcessingOrder(false));
      dispatch(setOrderPlacedSuccessfully(true));
      dispatch(setOrderSummary(response.summary.order));
      dispatch(clearCheckout());
      localStorage.removeItem("guestCart");
    } else {
      console.error("Order Creation Failed:", response);
    }
  };

  const checkCodANDPrepaidAvailability = async () => {
    const prepaidItems = cartData.cartItems.filter((item) => item.cod_disable);
    const codAvailableItems = cartData.cartItems.filter(
      (item) => !item.cod_disable
    );

    if (prepaidItems.length === 0 && codAvailableItems.length > 0) {
      // Only COD available
      handleCODPayment();
    } else if (prepaidItems.length > 0 && codAvailableItems.length === 0) {
      // Only Prepaid available
      dispatch(setProcessingOrder(false));
      alert("All the items are Prepaid, cannot process COD payment");
    } else if (prepaidItems.length > 0 && codAvailableItems.length > 0) {
      // Both options available
      dispatch(setProcessingOrder(false));
      dispatch(setOptionModal(true));
      // console.log("Both Prepaid and COD are available");
    }
  };

  const finalValidate = async () => {
    if (validateForm()) {
      try {
        dispatch(setProcessingOrder(true));
        setCartError(false);

        const requestedData = {
          cartItems: cartData?.cartItems,
        };

        const response = await checkoutService.valideCheckoutCart(
          requestedData
        );

        if (response.success) {
          const validatedItems = response.updatedCartItems;

          // Update cart items with the latest stock status
          const updatedCartItems = updateCartStockStatus(
            cartData.cartItems,
            validatedItems
          );

          // Dispatch the updated cart to Redux store
          dispatch(updateCartData({ cartItems: updatedCartItems }));

          // Check if any item is out of stock
          const outOfStockItems = validatedItems.filter(
            (item: any) => !item.isInStock
          );

          if (outOfStockItems.length > 0) {
            setCartError(true);
            dispatch(setProcessingOrder(false));
            return; // stop further action if stock issue
          }

          if (selectedPaymentMethod === "cash_on_delivery") {
            checkCodANDPrepaidAvailability();
          } else {
            handleOnline();
          }
        }
      } catch (error) {
        console.error("Internal Server Error", error);
        setCartError(true);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={finalValidate}
        disabled={loading || paymentMethod?.length === 0}
        className="w-full"
      >
        {loading && <LoaderIcon size={20} className="animate-spin" />}

        {selectedPaymentMethod === "razorpay" && "Pay With Razorpay"}
        {selectedPaymentMethod === "cashfree" && "Pay With Cashfree"}
        {selectedPaymentMethod === "cash_on_delivery" && "Pay COD"}
      </Button>

      {open && (
        <div className="backdrop-blur-sm bg-black/55 fixed inset-0 z-50"></div>
      )}

      <Modal width={450} open={open} footer={null}>
        <div className="flex items-center justify-center py-8">
          {processing ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <svg className="svgClass animate-spin" viewBox="25 25 50 50">
                <circle className="circleClass" r="20" cy="50" cx="50"></circle>
              </svg>
              <h3 className="text-sm tracking-wider font-medium text-green-700">
                Processing your payment
              </h3>
              <p className="text-xs text-center max-w-xs tracking-wide leading-snug text-gray-600">
                Please wait while we prepare your payment. This usually takes a
                few seconds.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <DotLottieReact
                className=""
                autoplay
                loop
                src="/assets/lottie/confirm.json"
              />
              <h2 className="text-base lg:text-lg font-semibold capitalize tracking-wide">
                Order placed successfully
              </h2>
              <p className="text-sm text-center text-gray-600">
                We've received your order and we are processing it.
              </p>

              {token ? (
                <>
                  <p className="text-sm text-center text-gray-600">
                    You can view your order details by clicking the button
                    below.
                  </p>
                  <Link href={`/account?tab=orders`}>
                    <Button className="mt-2 px-4 py-2 text-white rounded-lg transition">
                      View Order
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-center text-gray-600">
                    The order summary and status updates will be sent to your
                    registered email address.
                  </p>
                  <p className="text-sm text-center text-gray-600">
                    Please check your inbox for confirmation and next steps.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>

      <Modal
        footer={null}
        open={cartError}
        onCancel={() => setCartError(!cartError)}
      >
        <div className="flex flex-col items-center justify-center gap-3 p-4">
          <div className="text-red-500">
            <TriangleAlert className="w-12 h-12" />
          </div>
          <h2 className="text-lg font-semibold text-center text-gray-800">
            Some items in your cart are out of stock
          </h2>
          <p className="text-sm text-center text-gray-600">
            Please review your cart and remove unavailable items to proceed with
            your order.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PayButton;
