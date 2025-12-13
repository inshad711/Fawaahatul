import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPaymentDetails, setSelectPayment } from "@/store/slice/sCheckout";
import { setOptionModal } from "@/store/slice/togglesSlice";

export default function PaymentForm() {
  const dispatch = useDispatch();
  const { paymentDetails, selectedPayment } = useSelector(
    (state: RootState) => state.checkoutsNew
  );

  const handlePaymentChange = (methodId: string, status: string) => {
    if (status === "inactive") return;

    dispatch(setSelectPayment(methodId));
  };

  return (
    <div className="max-w-full mx-auto">
      {paymentDetails && (
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          Payment Method
        </h2>
      )}

      {/* <pre>{JSON.stringify(paymentDetails, null, 2)}</pre> */}

      {paymentDetails &&
        paymentDetails.map((method: any) => (
          <div
            key={method.value}
            className={`border rounded-lg mb-3 overflow-hidden p-4 flex items-center justify-between bg-white  
                        ${method.status === "inactive" ? "opacity-40" : ""}
                        ${
                          selectedPayment === method.value
                            ? "border-templateText"
                            : ""
                        }`}
            onClick={() => handlePaymentChange(method.value, method.status)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.value
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === method.value && (
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="font-medium">{method.name}</div>
                {/* {method.description && <div className="text-sm text-gray-600">{method.description}</div>} */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
