import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { razorpayPayment, uploadOrder } from "@/lib/gateway";
import Cookies from "js-cookie";
import {
  setOptionModal,
  setOrderPlaced,
  setOrderPlacedSuccessfully,
  setProcessingMessage,
  setProcessingOrder,
} from "@/store/slice/CheckoutPage/checkoutToggle";
import {
  clearCheckout,
  setSelectedPaymentMethod,
} from "@/store/slice/CheckoutPage/checkoutSlice";
import { Loader } from "lucide-react";
import { Modal } from "antd";
import { cashfreePayment } from "@/lib/cashfreeGateway";
import { codPayment } from "@/lib/codGateway";
import { setOrderSummary } from "@/store/slice/CheckoutPage/orderSummary";

interface Props {
  setProcessing: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  prepaidTotal: number;
  codTotal: number;
}

const PlacePartialOrder: React.FC<Props> = ({
  setProcessing,
  setOpen,
  prepaidTotal,
  codTotal,
}) => {
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<
    "idle" | "prepaid" | "cod"
  >("idle");

  const {
    cartData,
    shippingAddress,
    shippingRate,
    paymentMethod,
    customerData,
  } = useSelector((state: RootState) => state.newCheckout);
  const StoredCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );

  const token = Cookies.get(process.env.AUTH_TOKEN!);

  const prepaidItems = cartData.cartItems.filter(
    (item: any) => item.cod_disable === true
  );
  const codAvailableItems = cartData.cartItems.filter(
    (item: any) => item.cod_disable === false
  );

  const filterActiveOnlinePaymentMethod = paymentMethod?.filter(
    (method: any) => {
      return method.value !== "cash_on_delivery" && method.status === "active";
    }
  );

  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);

  const summary = {
    texes: cartData.totalTax,
    subtotal: prepaidTotal,
    total_amount: prepaidTotal,
    discount_amount: cartData.totalDiscount,
    shipping_amount: shippingRate?.flatRate || 0,
    paid_by_customer: prepaidTotal,
  };

  const codSummary = {
    texes: cartData.totalTax,
    subtotal: codTotal,
    total_amount: codTotal,
    discount_amount: cartData.totalDiscount,
    shipping_amount: shippingRate?.flatRate || 0,
    paid_by_customer: 0,
  };

  const handleConfirm = () => {
    setConfirm(true);
  };

  const handlePlaceMixedOrder = async () => {
    setLoading(false);
    dispatch(setOptionModal(false));
    setConfirm(false);
    dispatch(setProcessingOrder(true));
    dispatch(setProcessingMessage("Processing prepaid order..."));

    const result = await cashfreePayment(
      customerData?.type,
      prepaidItems,
      token ? StoredCustomerData : customerData,
      prepaidTotal,
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
      // console.log(result, "result of cashfree");
      if ("summary" in result) {
        dispatch(setOrderSummary(result.summary));
      }
      dispatch(setProcessingMessage("Processing COD order..."));
      const response: any = await codPayment(
        { type: "COD" },
        codAvailableItems,
        codSummary,
        codTotal,
        token ? StoredCustomerData : customerData,
        shippingAddress,
        "Cash On Delivery",
        "Unpaid",
        geoLocation?.countryName?.toLocaleLowerCase() === "india"
          ? "INR"
          : "USD",
        "NOTES"
      );
      if (response.success) {
        dispatch(setProcessingOrder(false));
        dispatch(setOrderPlacedSuccessfully(true));
        // console.log(response, "response of cod");
        dispatch(setOrderSummary(response.summary.order));
        dispatch(clearCheckout());
        localStorage.removeItem("guestCart");
      } else {
        console.error("Order Creation Failed:", response);
      }
    } else {
      // console.log("Payment Failed");
      setTimeout(() => {
        dispatch(setProcessingOrder(false));
      }, 1000);
    }
  };

  return (
    <>
      <Button onClick={handleConfirm} disabled={loading}>
        {loading && <Loader size={16} className="animate-spin" />}
        Place your order
      </Button>

      <Modal
        open={confirm}
        footer={null}
        onCancel={() => setConfirm(false)}
        width={400}
        className="w-full lg:w-[400px]"
      >
        <div className="w-full pt-4 h-full flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-xl leading-tight">
            Confirm your payment method for this mixed order
          </h3>

          <p className="text-sm leading-relaxed text-gray-600">
            Your order contains both Prepaid and Cash on Delivery (COD) items.
            Proceeding now will require you to pay only for the prepaid items at
            checkout. The COD items will remain payable upon delivery.
          </p>
          <div className="flex gap-2 w-full mt-2">
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  handlePlaceMixedOrder();
                }, 500);
              }}
              className="w-full"
              variant="default"
            >
              {loading && <Loader size={16} className="animate-spin" />}
              OK, proceed with payment
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlacePartialOrder;
