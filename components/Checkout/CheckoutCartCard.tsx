import React, { useState } from "react";
import ImageWithFallback from "../Image/Fallbackimage";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
import { Tooltip, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem } from "@/store/slice/sCheckout";
import { RootState } from "@/store/store";
import { useFormatAmount } from "@/hooks/useFormatAmount";
interface Props {
  cartData: {
    id: any;
    cod_disable: boolean;
    image: { url: string; alt: string };
    title: string;
    sellingPrice: number;
    regularPrice: number;
    quantity: number;
    variant_name: string;
  };
  selectedPayment?: string;
}

const CheckoutCartCard: React.FC<Props> = ({ cartData }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatAmount } = useFormatAmount();
  const { selectedPayment } = useSelector(
    (state: RootState) => state.checkoutsNew
  );

  const handleConfirmPrepaid = () => {
    dispatch(
      updateCartItem({
        id: cartData?.id,
        variant_name: cartData?.variant_name,
        updates: { cod_disable: false },
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Product Image with Quantity Badge */}
        <div
          className={`relative w-14 h-16 lg:w-14 lg:h-16 ${
            cartData?.cod_disable && selectedPayment === "cash_on_delivery"
              ? "opacity-50"
              : ""
          }`}
        >
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${cartData?.image.url}`}
            alt={cartData?.image.alt || "Product Image"}
            sizes="80px"
            className="h-full w-full rounded-md  object-cover"
            height={80}
            width={80}
          />
          <span className="absolute -top-2 -right-2 rounded-full bg-templateText text-white text-xs font-semibold h-6 w-6 flex items-center justify-center shadow-md">
            {cartData?.quantity}
          </span>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-1">
          {JSON.stringify(cartData.cod_disable)}
          <h2
            className={`tracking-wide text-sm line-clamp-1 font-medium 
              ${
                cartData?.cod_disable && selectedPayment === "cash_on_delivery"
                  ? "text-gray-300"
                  : "text-gray-800"
              }
                `}
          >
            {cartData?.title}{" "}
            {cartData?.variant_name && `- ${cartData.variant_name}`}
          </h2>
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h2
                className={`text-sm font-semibold ${
                  cartData?.cod_disable &&
                  selectedPayment === "cash_on_delivery"
                    ? "text-gray-300"
                    : "text-templateText"
                }`}
              >
                {formatAmount(Number(cartData?.sellingPrice))}
              </h2>
              <h2 className="text-gray-500 line-through text-xs">
                {formatAmount(Number(cartData?.regularPrice))}
              </h2>
            </div>
            {selectedPayment === "cash_on_delivery" &&
              cartData?.cod_disable && (
                <div className="opacity-100">
                  <Tooltip
                    title="This product is not available for Cash on Delivery. You can proceed with a prepaid payment."
                    showArrow
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setIsModalOpen(true)}
                      className="text-gray-700"
                    >
                      <CheckIcon className="mr-1 h-4 w-4" /> Make it prepaid
                    </Button>
                  </Tooltip>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Prepaid Payment"
        open={isModalOpen}
        onOk={handleConfirmPrepaid}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes, Make Prepaid"
        cancelText="Cancel"
      >
        <p>
          This product is not available for Cash on Delivery. Do you want to
          proceed with a prepaid payment?
        </p>
      </Modal>
    </div>
  );
};

export default CheckoutCartCard;
