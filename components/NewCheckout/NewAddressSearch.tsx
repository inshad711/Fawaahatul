import { shippingService } from "@/services/shippingService";
import {
  setGlobalCodStatus,
  setMinOrderAmount,
  setPaymentMethod,
  setShippingRate,
  updateMultipleShippingFields,
} from "@/store/slice/CheckoutPage/checkoutSlice";
import {
  setShowPaymentMethod,
  setShowShippingMethod,
} from "@/store/slice/CheckoutPage/checkoutToggle";
import { RootState } from "@/store/store";
import { Input, Spin } from "antd";
import { SearchIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  selectedCountry: string;
}

const NewAddressSearch: React.FC<Props> = ({ selectedCountry }) => {
  const { formErrors, cartData, customerData } = useSelector(
    (state: RootState) => state.newCheckout
  );

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [debouncedValue, setDebouncedValue] = useState("");
  const { shippingAddress } = useSelector(
    (state: RootState) => state.newCheckout
  );

  useEffect(() => {
    if (searchValue) setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const fetchAddressSuggestions = async () => {
    if (!debouncedValue) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/address-suggestions?query=${debouncedValue}&countrySelected=${selectedCountry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = async (selectedAddress: any) => {
    const filteredCartItems = cartData?.cartItems?.map(
      ({ id, combination }: any) => ({
        id,
        combination,
      })
    );

    const requestedData = {
      address: selectedAddress,
      cartItems: filteredCartItems,
      identifier: {
        email: customerData?.email || null,
        phone: customerData?.phone || null,
      },
    };

    const res = await shippingService.getShippingCharges(requestedData);

    if (res?.success) {
      setSuggestions([]);
      // setSearchValue(selectedAddress.description);

      dispatch(setShowPaymentMethod(true));
      dispatch(setShowShippingMethod(true));
      dispatch(setPaymentMethod(res?.data?.payment_methods));
      dispatch(
        setGlobalCodStatus(res?.data?.globalCODSettings?.is_cod_enabled)
      );
      dispatch(
        setMinOrderAmount(res?.data?.globalCODSettings?.min_order_amount)
      );
      dispatch(
        updateMultipleShippingFields({
          state: selectedAddress?.state,
          postalCode: selectedAddress?.pincode,
          city: selectedAddress?.city,
          address: selectedAddress?.full_address,
        })
      );
      dispatch(setShippingRate(res?.data?.shippingRate));
    }
  };

  useEffect(() => {
    fetchAddressSuggestions();
  }, [debouncedValue]);

  const handleClearAddress = () => {
    // setSearchValue("");
    dispatch(
      updateMultipleShippingFields({
        address: "",
      })
    );
  };

  return (
    <div className="relative">
      {shippingAddress?.address && (
        <p className="flex   items-center justify-end gap-1 pb-1 underline text-xs">
          <span
            onClick={handleClearAddress}
            className="cursor-pointer flex items-center"
          >
            Clear address <X size={12} />
          </span>
        </p>
      )}
      <div className="relative">
        <div>
          <Input
            placeholder="Address"
            id="address"
            type="text"
            autoComplete="off"
            value={shippingAddress?.address || searchValue}
            className={`borderrounded-md py-2 px-3 w-full ${
              formErrors.address && "border border-red-500"
            }`}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {formErrors.address && (
            <p className="text-red-500 mt-2 text-xs">{formErrors.address}</p>
          )}
        </div>
        {!shippingAddress?.address && (
          <SearchIcon className="absolute right-2 top-2 text-gray-500 text-xs w-4" />
        )}
      </div>
      {(suggestions.length > 0 || loading) && (
        <ul className="absolute z-50 bg-white shadow-lg overflow-hidden p-1 rounded-sm mt-2 w-full">
          {loading ? (
            <div className="p-4 flex items-center justify-center">
              <Spin />
            </div>
          ) : (
            suggestions.map((suggestion: any) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="p-2 hover:bg-gray-100 text-sm tracking-wide cursor-pointer rounded"
              >
                {suggestion.description}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default NewAddressSearch;
