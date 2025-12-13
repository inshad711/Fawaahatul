"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Modal } from "antd";
import NewCheckoutCartCard from "./NewCheckoutCartCard";
import PayOnline from "../Button/PayOnline";
import PlacePartialOrder from "../Button/PlacePartialOrder";
import { updateCartItemField } from "@/store/slice/CheckoutPage/checkoutSlice";
import Processing from "../Loader/Processing";
import PartialTotalBilling from "../NewCheckoutComp/PartialTotalBilling";
import { setOptionModal } from "@/store/slice/CheckoutPage/checkoutToggle";

const OptionModal = () => {
  const [change, setChange] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const { optionModal } = useSelector(
    (state: RootState) => state.checkoutToggle
  );
  const { cartData } = useSelector((state: RootState) => state.newCheckout);
  const dispatch = useDispatch();

  // Separate the orders
  const prepaidItems = cartData.cartItems.filter((item) => item.cod_disable);
  const codAvailableItems = cartData.cartItems.filter(
    (item) => !item.cod_disable
  );

  // Calculate total function
  const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => {
      let itemTotal = 0;

      if (item.finalSellingPrice !== undefined) {
        // If finalSellingPrice exists, it's already discounted + taxed
        itemTotal = parseFloat(item.finalSellingPrice) * item.quantity;
      } else {
        // If no discount applied, use: (sellingPrice * quantity) + taxAmount
        itemTotal = item.sellingPrice * item.quantity + item.taxAmount;
      }

      return total + itemTotal;
    }, 0);
  };

  const prepaidTotal = calculateTotal(prepaidItems);
  const codTotal = calculateTotal(codAvailableItems);

  const handleCancel = () => {
    setProcessing(false);
    setOpen(false);
    dispatch(setOptionModal(false));
  };

  // const handleRevert = () => {};

  const handleChangeToPrepaid = () => {
    setChange(true);
  };

  const handleConfirmPrepaid = () => {
    setChange(false);
    codAvailableItems.forEach((item: any) => {
      dispatch(
        updateCartItemField({
          id: item.id,
          fields: {
            cod_disable: true,
          },
        })
      );
    });
  };

  return (
    <>
      <Modal
        width={codAvailableItems.length > 0 ? 700 : 450}
        open={optionModal}
        style={{
          top: 50,
        }}
        onCancel={!processing ? handleCancel : undefined}
        footer={null}
      >
        {open ? (
          <Processing processing={processing} />
        ) : (
          <div className={`h-full space-y-4 pt-5 pb-2`}>
            <div className="w-full lg:flex gap-6">
              <div
                className={`${
                  codAvailableItems.length > 0 ? "w-full lg:w-full" : "w-full"
                } space-y-2`}
              >
                <h3 className="text-base font-semibold">
                  Prepaid Orders{" "}
                  <span className="text-xs text-gray-500">
                    (COD Not Applicable)
                  </span>
                </h3>
                <div className="overflow-y-auto  py-2">
                  <div className="space-y-2">
                    {prepaidItems.map((item: any, index: number) => (
                      <div key={index} className="">
                        <NewCheckoutCartCard cartData={item} />
                      </div>
                    ))}
                  </div>

                  {prepaidItems.length === 0 && (
                    <p className="p-4 text-gray-500">No Prepaid items</p>
                  )}
                </div>
              </div>

              {codAvailableItems.length > 0 ? (
                <>
                  <div className="w-px bg-gray-200 self-stretch"></div>

                  <div className="w-full lg:w-full space-y-2">
                    <h3 className="text-base font-semibold">
                      COD Available Orders
                    </h3>
                    <div className="overflow-y-auto lg:h-[45vh] py-2">
                      <div className="space-y-2">
                        {codAvailableItems.map((item: any, index: number) => (
                          <div key={index} className="">
                            <NewCheckoutCartCard cartData={item} />
                          </div>
                        ))}
                      </div>
                      {codAvailableItems.length === 0 && (
                        <p className="p-4 text-gray-500">No Prepaid items</p>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <PartialTotalBilling
              prepaidTotal={prepaidTotal}
              codTotal={codTotal}
            />
            <hr />
            <div className="w-full gap-2 place-content-center grid">
              {codAvailableItems.length > 0 ? (
                <div className="flex flex-col w-full lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                  <Button onClick={handleChangeToPrepaid} variant={"secondary"}>
                    Convert into prepaid
                  </Button>
                  <div className="space-y-2 lg:space-y-1">
                    <PlacePartialOrder
                      setProcessing={setProcessing}
                      setOpen={setOpen}
                      prepaidTotal={prepaidTotal}
                      codTotal={codTotal}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <PayOnline
                    items={cartData}
                    setProcessing={setProcessing}
                    setOpen={setOpen}
                  />
                  {/* <Button onClick={handleRevert} variant={"outline"}>Revert</Button> */}
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={change}
        footer={null}
        onCancel={() => setChange(false)}
        width={450}
        className="w-full lg:w-[400px]"
      >
        <div className="w-full pt-4 h-full flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-xl leading-tight">
            Are you sure you want to change the payment method?
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 ">
            Converting to prepaid will change your entire order to prepaid. All
            items currently marked for Cash on Delivery (COD) will be converted,
            and you’ll be required to pay the full amount upfront. This includes
            any COD items already in your cart.
          </p>
          <div className="flex gap-2 w-full mt-2">
            <Button
              className="w-1/2"
              variant="secondary"
              onClick={() => setChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2"
              variant="default"
              onClick={handleConfirmPrepaid}
            >
              Yes proceed
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OptionModal;
