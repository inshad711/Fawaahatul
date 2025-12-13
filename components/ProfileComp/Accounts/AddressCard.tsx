import React from "react";
import { BookUser, BriefcaseBusiness, Home } from "lucide-react";
import RemoveAddress from "./RemoveAddress";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "@/store/slice/sCheckout";
import { RootState } from "@/store/store";

interface Props {
  data?: any;
  email?: string;
  isCheckoutPage?: boolean;
  handleRemoveAddressUpdate: any;
  showModal: any;
}

const AddressCard: React.FC<Props> = ({
  data,
  isCheckoutPage,
  email,
  handleRemoveAddressUpdate,
  showModal,
}) => {
  const dispatch = useDispatch();
  const requestedData = {
    country: data?.country,
    firstName: data?.first_name,
    lastName: data?.last_name,
    company: data?.company,
    address: data?.address,
    apartment: data?.apartment || "",
    city: data?.city,
    state: data?.state,
    pincode: data?.postalcode,
    phone: data?.phones_address,
    saveInfo: true,
    isSelected: true,
  };
  // const checkoutData = useSelector((state: RootState) => state.checkoutData);
  const handleSetShippingAddress = () => {
    // console.log(requestedData);
    dispatch(setShippingAddress(requestedData as any));
  };
  return (
    <div className=" min-h-full min-w-full">
      <div
        className={`bg-white rounded-md border ${
          data.default_address && !isCheckoutPage ? "border-green-500" : ""
        } p-4`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium tracking-wider text-templatePrimary">
            {data.first_name} {data.last_name}
          </h2>
          <RemoveAddress
            showModal={showModal}
            data={data}
            handleRemoveAddressUpdate={handleRemoveAddressUpdate}
          />
        </div>

        {!isCheckoutPage && (
          <div className="flex flex-wrap gap-2">
            {data.default_address && (
              <div
                className="text-xs inline-block tracking-wider px-3 py-1 bg-green-500 text-white rounded-full"
                title="Default Address"
              >
                Default
              </div>
            )}
            {data.address_type === 0 && (
              <div
                className="text-xs flex items-center gap-1 tracking-wider px-3 py-1 bg-gray-200 text-black rounded-full"
                title="Default Address"
              >
                <Home size={14} strokeWidth={1.5} /> Home
              </div>
            )}
            {data.address_type === 1 && (
              <div
                className="text-xs flex items-center gap-1 tracking-wider px-3 py-1 bg-gray-200 text-black rounded-full"
                title="Default Address"
              >
                <BriefcaseBusiness strokeWidth={1.5} size={14} /> Work
              </div>
            )}
            {data.address_type === 2 && (
              <div
                className="text-xs flex items-center gap-1 tracking-wider px-3 py-1 bg-gray-200 text-black rounded-full"
                title="Default Address"
              >
                <BookUser strokeWidth={1.5} size={14} />
                Other
              </div>
            )}
          </div>
        )}

        {!isCheckoutPage && (
          <div className="">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span>{data.phones_address}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span>{email}</span>
            </p>
          </div>
        )}

        <p className=" block text-gray-600 leading-tight text-sm">
          {data.address}
        </p>

        {isCheckoutPage && (
          <Button
            onClick={handleSetShippingAddress}
            className="w-full tracking-wide h-8 text-xs mt-2"
          >
            Select shipping address
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
