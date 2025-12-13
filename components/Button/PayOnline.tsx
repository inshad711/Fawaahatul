import React, { useState } from "react";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { razorpayPayment } from "@/lib/gateway";

import Cookies from "js-cookie";
import { setOptionModal } from "@/store/slice/togglesSlice";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import {
  setOrderPlacedSuccessfully,
  setProcessingOrder,
} from "@/store/slice/CheckoutPage/checkoutToggle";
import { clearCheckout } from "@/store/slice/CheckoutPage/checkoutSlice";
import { cashfreePayment } from "@/lib/cashfreeGateway";
import { setOrderSummary } from "@/store/slice/CheckoutPage/orderSummary";
interface Props {
  items: any;
  setProcessing: any;
  setOpen: any;
}

const PayOnline: React.FC<Props> = ({ items, setProcessing, setOpen }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const dispatch = useDispatch();
  const { formatAmount } = useFormatAmount();

  const {
    paymentMethod,
    selectedPaymentMethod,
    cartData,
    customerData,
    shippingAddress,
    internalShippingRate,
    shippingRate,
  } = useSelector((state: RootState) => state.newCheckout);

  // const { cartData } = useSelector((state: RootState) => state.newCheckout);

  const filteredItems = cartData.cartItems.filter(
    (item: any) => item.cod_disable === true
  );

  const StoredCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  const total = filteredItems?.reduce(
    (acc: any, item: any) => acc + item?.sellingPrice * item.quantity,
    0
  );
  const [loading, setLoading] = useState(false);
  // const shippingRate = parseFloat((shippingCharges?.flatRate as any) || 0);
  const taxAmount = (total + shippingRate) * 0.18;
  const taxableAmount = total + shippingRate + taxAmount;

  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);

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

  const handlePayment = async (method: string) => {
    const selectedMethod = paymentMethod?.find(
      (payment: any) => payment.value === method
    );
    // console.log(selectedMethod, method, "Selected method");

    setLoading(true);
    try {
      if (method === "razorpay") {
        const response: any = await razorpayPayment(
          cartData.totalTaxableAmount,
          "",
          selectedMethod?.credentials,
          "INR",
          cartData.cartItems,
          token ? StoredCustomerData : customerData,
          shippingAddress,
          shippingAmount || 0,
          summary,
          "NOTES"
        );

        // console.log(response, "Razorpay resonse");

        if (response.ok) {
          dispatch(setProcessingOrder(false));
          dispatch(setOrderPlacedSuccessfully(true));
          dispatch(setOrderSummary(response.orderResponse.summary.order));
          // console.log(response, "Razorpay resonse");
          dispatch(clearCheckout());
          localStorage.removeItem("guestCart");
        } else {
          dispatch(setProcessingOrder(false));
          // console.log(response, "Razorpay resonse");
        }
      } else if (method === "cashfree") {
        const result = await cashfreePayment(
          customerData?.type,
          cartData?.cartItems,
          customerData,
          cartData.totalTaxableAmount,
          {},
          shippingAddress,
          new Date().toISOString(),
          "web",
          false,
          false,
          cartData?.cartItems?.length,
          summary,
          geoLocation?.countryName?.toLocaleLowerCase() === "india"
            ? "INR"
            : "USD",
          "NOTES"
        );
        if (result?.status === "success") {
          setTimeout(() => {
            if ("summary" in result) {
              dispatch(setOrderSummary(result.summary));
            }
            dispatch(setProcessingOrder(false));
            dispatch(setOrderPlacedSuccessfully(true));
          }, 1000);
        } else {
          // console.log("Payment Failed");
          setTimeout(() => {
            // setProcessing(false);
            // setLoading(false);
            dispatch(setProcessingOrder(false));
            dispatch(clearCheckout());
            localStorage.removeItem("guestCart");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("JWT Decode Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onlinePaymentMethods = paymentMethod?.filter((method: any) => {
    return method.value !== "cash_on_delivery" && method.status === "active";
  });

  return (
    <div
      className={`grid grid-cols-${onlinePaymentMethods?.length} gap-x-2 gap-y-4 w-full`}
    >
      <div
        className={`tracking-wide text-xs col-span-${onlinePaymentMethods?.length} font-medium text-center`}
      >
        Total{" "}
        <span className="font-semibold text-xl">
          {formatAmount(cartData.totalTaxableAmount)}
        </span>
      </div>
      {onlinePaymentMethods && onlinePaymentMethods?.length > 0 ? (
        onlinePaymentMethods?.map((method: any) => (
          <Button
            disabled={loading}
            className="w-full capitalize"
            onClick={() => handlePayment(method.value)}
          >
            {loading && <LoaderIcon className="animate-spin" />} Pay using{" "}
            {method.value.replaceAll("_", " ")}
          </Button>
        ))
      ) : (
        <div className="text-center text-sm text-gray-500">
          No online payment methods available
        </div>
      )}
    </div>
  );
};

export default PayOnline;
