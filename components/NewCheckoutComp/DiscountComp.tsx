import React, { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { discountService } from "@/services/discountService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Loader } from "lucide-react";
import {
  setCartData,
  updateCartData,
} from "@/store/slice/CheckoutPage/checkoutSlice";

const DiscountComp = () => {
  const { cartData, customerData, shippingRate } = useSelector(
    (state: RootState) => state.newCheckout
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  const dispatch = useDispatch();

  const handleDiscountApply = async (e: any) => {
    e.preventDefault();
    if (discountCode) {
      const requestedData = {
        discount_code: discountCode.toUpperCase(),
        cartTotal: cartData.totalTaxableAmount,
        cartItems: cartData.cartItems,
        customer: customerData || null,
        shippingAmount: shippingRate.flatRate,
        MIN_AMOUNT_FOR_FREE_SHIPPING: shippingRate.MIN_AMOUNT_FOR_FREE_SHIPPING,
      };
      try {
        setLoading(true);
        const res = await discountService.applyDiscountCode(requestedData);
        if (res.success) {
          // console.log(res);
          setError("");
          setSuccess(`${discountCode.toUpperCase()} applied successfully`);
          dispatch(
            setCartData({
              cart: res.updatedCartItems,
              totalDiscount: res.totalDiscount,
              discount_value: res.discount_value,
              discountType: res.discountType,
              totalAmount: res.totalAmount,
              totalTax: res.totalTax,
              totalTaxableAmount: res.totalTaxableAmount,
            })
          );
        } else {
          // console.log(res.error.message, "ERROR");
          setError(res.error.message);
          setSuccess("");
        }
      } catch (error: any) {
        toast("Internal Server Error", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a valid discount code");
      setSuccess("");
    }
  };
  return (
    <form onSubmit={handleDiscountApply} className="space-y-1.5">
      <div className="flex gap-2">
        <input
          type="text"
          disabled={Boolean(success) || loading}
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          name="discontCode"
          className={`block ${
            Boolean(success) || loading
              ? "cursor-not-allowed bg-black/5 text-gray-500"
              : ""
          } uppercase tracking-wide w-full rounded border-gray-300 shadow-sm focus:border-black focus:ring-black px-3 py-2 text-sm border outline-none`}
          placeholder="Discount code"
        />
        <Button
          disabled={Boolean(success) || loading}
          type="submit"
          className="flex items-center justify-center w-auto gap-2 border border-templateText bg-templateText hover:opacity-90 px-6 rounded tracking-wider text-sm text-white font-medium"
        >
          {success ? "Applied" : "Apply"}{" "}
          {loading && <Loader size={18} className="animate-spin" />}
        </Button>
      </div>
      {error && (
        <p className="text-red-600 text-[13px] tracking-wide">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-[13px] tracking-wide">{success}</p>
      )}
    </form>
  );
};

export default DiscountComp;
