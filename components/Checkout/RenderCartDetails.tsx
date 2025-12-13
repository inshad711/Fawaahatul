import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import NewCheckoutCartCard from "./NewCheckoutCartCard";
import { Info, Tag } from "lucide-react";
import { Modal } from "antd";
import ShippingPolicy from "../Policies/ShippingPolicy";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DiscountComp from "../NewCheckoutComp/DiscountComp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setInternationalShipping } from "@/store/slice/CheckoutPage/checkoutSlice";
import { formatUSD } from "@/lib/utils";
import { calculateInternationalShipping } from "@/utils/constants";

interface Props {}

const RenderCartDetails: React.FC<Props> = () => {
  const { cartData, shippingRate } = useSelector(
    (state: RootState) => state.newCheckout
  );
  const dispatch = useDispatch();
  const [showPolicy, setShowPolicy] = useState(false);
  const { formatAmount } = useFormatAmount();
  const { showShippingMethod } = useSelector(
    (state: RootState) => state.checkoutToggle
  );

  const MIN_AMOUNT_FOR_FREE_SHIPPING =
    process.env.MIN_AMOUNT_FOR_FREE_SHIPPING || null;
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  );
  const totalItems = cartData.cartItems
    ?.filter((item: any) => item.inStock)
    .reduce((acc: number, item: any) => acc + item.quantity, 0);

  useEffect(() => {
    if (geoLocation?.countryName?.toLocaleLowerCase() !== "india") {
      dispatch(
        setInternationalShipping(
          calculateInternationalShipping(totalItems, globalSetting)
        )
      );
    }
  }, [geoLocation]);

  return (
    <div className="space-y-4 p-4 lg:p-0">
      {cartData?.cartItems?.length <= 0 ? (
        <div className="w-full h-full py-8 space-y-2">
          <div className="flex items-center justify-center">
            <Image
              src={"/assets/placeholders/emptycart.webp"}
              alt="empty cart"
              height={150}
              width={150}
            />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-templateText text-center">
              Your cart is empty
            </h2>
            <p className="text-xs text-center text-gray-500 tracking-wide font-medium">
              There is nothing in your bag. Let's add some items.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[45vh] lg:max-h-full overflow-hidden overflow-y-auto">
          {cartData?.cartItems?.map((item: any, index: number) => (
            <div key={index}>
              <NewCheckoutCartCard cartData={item} />
            </div>
          ))}
        </div>
      )}

      {showShippingMethod && (
        <>{shippingRate?.calculated && <DiscountComp />}</>
      )}

      <hr />
      <div className="space-y-3.5">
        <div className="flex  items-center justify-between">
          <h2 className="text-sm lg:text-base">
            Subtotal {totalItems > 0 && <span>({totalItems} items)</span>}
          </h2>
          <h2 className="text-xs lg:text-base tracking-wide">
            {formatAmount(cartData.totalAmount)}
          </h2>
        </div>
        {geoLocation?.countryName?.toLocaleLowerCase() !== "india" ? (
          <div className="flex items-center justify-between">
            <h2
              // onClick={() => setShowPolicy(true)}
              className="flex items-center text-sm tracking-wide gap-2 cursor-pointer"
            >
              Additional International Shipping{" "}
              <Info size={14} className="mt-1 text-gray-500" />
            </h2>
            <h2 className="text-green-600 uppercase font-semibold">
              {formatAmount(
                calculateInternationalShipping(totalItems, globalSetting)
              )}
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2
              // onClick={() => setShowPolicy(true)}
              className="flex items-center text-sm lg:text-base gap-2 "
            >
              Shipping Fee
              {/* <Info size={14} className="mt-1 text-gray-500" /> */}
            </h2>
            <h2 className="text-gray-600 text-[13px] uppercase font-semibold tracking-wide">
              {showShippingMethod ? (
                <>
                  {shippingRate?.calculated ? (
                    <>
                      {shippingRate.flatRate === 0 ? (
                        <span className="text-green-600 uppercase font-semibold">
                          Free
                        </span>
                      ) : (
                        formatAmount(shippingRate.flatRate)
                      )}
                    </>
                  ) : (
                    <span>Calculated at next step</span>
                  )}
                </>
              ) : (
                <span>Calculated at next step</span>
              )}
            </h2>
          </div>
        )}

        {parseInt(shippingRate.MIN_AMOUNT_FOR_FREE_SHIPPING as any) > 0 && (
          <p className="text-sm text-green-600 font-medium">
            Free shipping on orders above{" "}
            {formatAmount(Number(MIN_AMOUNT_FOR_FREE_SHIPPING))}
          </p>
        )}

        {Number(cartData.totalDiscount) > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="flex items-center text-sm lg:text-base gap-2">
              Discount Applied <Tag size={12} />
            </h2>
            <h2 className="text-green-600 text-xs tracking-wide">
              - {formatAmount(Number(cartData.totalDiscount))}
            </h2>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold tracking-wide">Total</p>
            {cartData.totalTax > 0 && (
              <p className="text-xs lg:text-sm text-gray-700">
                Including {formatAmount(cartData.totalTax)} in taxes
              </p>
            )}
          </div>
          <span className="text-lg lg:text-xl font-semibold tracking-wide">
            {formatAmount(Number(cartData.totalTaxableAmount))}
          </span>
        </div>
      </div>
      <Modal
        width={700}
        style={{
          top: 50,
        }}
        open={showPolicy}
        onCancel={() => setShowPolicy(false)}
        footer={null}
      >
        {geoLocation?.countryName?.toLocaleLowerCase() === "india" ? (
          <ShippingPolicy />
        ) : (
          <div className="space-y-2 text-sm text-gray-700">
            <h3 className="text-base font-semibold text-gray-900">
              International Shipping Policy
            </h3>
            <p>
              We apply a standard international shipping charge to ensure safe
              and reliable delivery across borders.
            </p>
            <ul className="list-disc list-inside">
              <li>
                A flat <strong>$30 shipping fee</strong> applies to the{" "}
                <strong>first item</strong> in your order.
              </li>
              <li>
                For <strong>each additional item</strong>, a{" "}
                <strong>$15 fee</strong> will be added.
              </li>
            </ul>
            <p>
              This tiered pricing helps cover the increasing costs of packaging,
              customs clearance, and international courier services. We aim to
              offer transparent and fair rates while ensuring your products
              reach you securely and on time.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RenderCartDetails;
