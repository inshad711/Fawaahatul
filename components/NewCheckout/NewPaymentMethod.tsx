import { setSelectedPaymentMethod } from "@/store/slice/CheckoutPage/checkoutSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NewPaymentMethod = () => {
  const {
    cartData,
    paymentMethod,
    selectedPaymentMethod,
    is_cod_enabled,
    min_order_amount,
  } = useSelector((state: RootState) => state.newCheckout);
  const dispatch = useDispatch();
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);

  const handlePaymentChange = (value: string, status: string) => {
    if (status === "inactive") return;
    dispatch(setSelectedPaymentMethod(value));
  };

  const OnlyActivePaymentMethod = paymentMethod?.filter((method: any) => {
    const isActive = method.status === "active";
    const isCOD = method.value === "cash_on_delivery";
    const isOutsideIndia =
      geoLocation?.countryName?.toLocaleLowerCase() !== "india";

    // Exclude COD if not in India
    if (isCOD && isOutsideIndia) return false;

    return isActive;
  });

  if (OnlyActivePaymentMethod?.length === 0)
    return (
      <div className="max-w-full mx-auto space-y-2">
        <h2 className="text-[20px] lg:text-[22px] text-gray-800 font-medium">
          Payment Method
        </h2>
        <p>No Payment Method Available</p>
      </div>
    );

  return (
    <div className="max-w-full mx-auto space-y-2">
      {paymentMethod && (
        <h2 className="text-[20px] lg:text-[22px] text-gray-800 font-medium">
          Payment Method
        </h2>
      )}

      {OnlyActivePaymentMethod?.map((method: any) => {
        // Skip rendering Cash on Delivery if the conditions are not met
        if (
          method.value === "cash_on_delivery" &&
          (!is_cod_enabled || cartData?.totalTaxableAmount <= min_order_amount)
        ) {
          return null;
        }

        return (
          <div
            key={method.value}
            className={`border rounded-lg mb-3 overflow-hidden p-4 flex items-center cursor-pointer justify-between bg-white  
                    ${method.status === "inactive" ? "opacity-40" : ""}
                    ${
                      selectedPaymentMethod === method.value
                        ? "border-templateText"
                        : ""
                    }`}
            onClick={() => handlePaymentChange(method.value, method.status)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  selectedPaymentMethod === method.value
                    ? "border-templateText"
                    : ""
                } flex items-center justify-center `}
              >
                {selectedPaymentMethod === method.value && (
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="font-medium">{method.name}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewPaymentMethod;
