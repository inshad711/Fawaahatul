import React, { useEffect, useMemo, useState } from "react";
import { Input, InputNumber, Select } from "antd";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCartData,
  setGlobalCodStatus,
  setMinOrderAmount,
  setPaymentMethod,
  setShippingRate,
  updateCartData,
  updateMultipleShippingFields,
  updateShippingAddress,
} from "@/store/slice/CheckoutPage/checkoutSlice";
import { Country, State, City } from "country-state-city";
import { shippingService } from "@/services/shippingService";
import {
  setShowPaymentMethod,
  setShowShippingMethod,
} from "@/store/slice/CheckoutPage/checkoutToggle";

const inputClass = "h-10 w-full";

const CheckoutShippingAddress = () => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<any>({
    totalAmount: 0,
    totalTaxableAmount: 0,
  });
  const { geoLocation } = useSelector((state: RootState) => state.geoLocation);
  const { shippingAddress, formErrors, cartData, customerData } = useSelector(
    (state: RootState) => state.newCheckout
  );

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => State.getStatesOfCountry(geoLocation?.countryCode || ""),
    [geoLocation?.countryCode]
  );
  const cities = useMemo(
    () =>
      City.getCitiesOfState(
        geoLocation?.countryCode || "",
        shippingAddress?.state || ""
      ),
    [geoLocation?.countryCode, shippingAddress?.state]
  );

  const handleChange = (field: string, value: string | number) => {
    if (
      shippingAddress?.countryCode !== geoLocation?.countryCallingCode ||
      shippingAddress?.country !== geoLocation?.countryCode
    ) {
      dispatch(
        updateMultipleShippingFields({
          country: geoLocation?.countryCode,
          countryCode: geoLocation?.countryCallingCode,
        })
      );
    }
    dispatch(updateShippingAddress({ [field]: value }));
  };

  useEffect(() => {
    if (
      initialData?.totalAmount === 0 &&
      initialData?.totalTaxableAmount === 0
    ) {
      setInitialData({
        totalAmount: cartData?.totalAmount,
        totalTaxableAmount: cartData?.totalTaxableAmount,
      });
    }
  }, [cartData]);

  useEffect(() => {
    if (shippingAddress?.state) {
      getShippingAndDelivery();
    }
  }, [shippingAddress?.state]);

  const getShippingAndDelivery = async () => {
    const filteredCartItems = cartData?.cartItems?.map(
      ({ id, combination }: any) => ({
        id,
        combination,
      })
    );

    const requestedData = {
      address: {
        description: shippingAddress?.address,
        place_id: null,
        full_address: `${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.state}, ${shippingAddress?.country}, ${shippingAddress?.postalCode}`,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        country: shippingAddress?.country,
        pincode: shippingAddress?.postalCode,
      },
      cartItems: filteredCartItems,
      identifier: {
        email: customerData?.email || null,
        phone: customerData?.phone || null,
      },
      cartTotal: cartData?.totalAmount,
      totalAmount: initialData
        ? initialData?.totalAmount
        : cartData?.totalAmount,
      totalTaxableAmount: initialData
        ? initialData?.totalTaxableAmount
        : cartData?.totalTaxableAmount,
      totalTax: cartData?.totalTax || 0,
    };

    const res = await shippingService.getShippingCharges(requestedData);

    if (res?.success) {
      dispatch(setShowPaymentMethod(true));
      dispatch(setShowShippingMethod(true));
      dispatch(setPaymentMethod(res?.data?.payment_methods));
      dispatch(
        setGlobalCodStatus(res?.data?.globalCODSettings?.is_cod_enabled)
      );

      dispatch(
        setMinOrderAmount(res?.data?.globalCODSettings?.min_order_amount)
      );
      console.log(res, "resssssssssssssssss");

      dispatch(
        updateCartData({
          totalAmount: res?.data?.totalAmount,
          totalTaxableAmount: res?.data?.totalTaxableAmount,
        })
      );
      // dispatch(
      //   updateMultipleShippingFields({
      //     state: selectedAddress?.state,
      //     postalCode: selectedAddress?.pincode,
      //     city: selectedAddress?.city,
      //     address: selectedAddress?.full_address,
      //   })
      // );
      dispatch(setShippingRate(res?.data?.shippingRate));
    }
  };

  const renderSelectField = (
    id: string,
    label: string,
    options: any[],
    value: string,
    error: string | undefined,
    fieldName: string,
    disabled: boolean = false
  ) => (
    <div className="w-full space-y-1">
      <Label htmlFor={id} className="text-xs text-gray-600 block">
        {label}
      </Label>
      <Select
        id={id}
        disabled={disabled}
        showSearch
        className={inputClass}
        value={value}
        onChange={(val) => handleChange(fieldName, val)}
        filterOption={(input, option: any) =>
          option?.label?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {options.map((opt) => (
          <Select.Option
            key={opt.isoCode || opt.name}
            value={opt.isoCode || opt.name}
            label={opt.name}
          >
            {opt.name}
          </Select.Option>
        ))}
      </Select>
      {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* {JSON.stringify(initialData)} */}
      {/* {JSON.stringify(cartData)} */}
      <h2 className="text-[20px] lg:text-[22px] text-gray-800 font-medium">
        Shipping Address
      </h2>

      {/* Country */}
      {renderSelectField(
        "country",
        "Country/Region",
        countries,
        geoLocation?.countryCode || "",
        undefined,
        "country",
        Boolean(geoLocation?.countryCode)
      )}

      {/* Name */}
      <div className="flex gap-3">
        <div className="w-full">
          <Input
            placeholder="First Name"
            className={`${inputClass} ${
              formErrors.firstName ? "border border-red-400" : ""
            }`}
            value={shippingAddress?.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          {formErrors.firstName && (
            <p className="text-red-500 mt-2 text-xs">First Name is required</p>
          )}
        </div>
        <Input
          placeholder="Last Name (Optional)"
          className={inputClass}
          value={shippingAddress?.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      {/* Address Fields */}
      <Input
        placeholder="Apartment (Optional)"
        className={inputClass}
        value={shippingAddress?.apartment || ""}
        onChange={(e) => handleChange("apartment", e.target.value)}
      />
      <Input
        placeholder="Address"
        className={inputClass}
        value={shippingAddress?.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
      />

      {formErrors.address && (
        <p className="text-red-500 mt-2 text-xs">Address is required</p>
      )}

      {/* State, City, Postal Code */}
      <div className="flex gap-3">
        {renderSelectField(
          "state",
          "State",
          states,
          shippingAddress?.state || "",
          formErrors.state,
          "state",
          !states?.length
        )}
        {renderSelectField(
          "city",
          "City",
          cities,
          shippingAddress?.city || "",
          formErrors.city,
          "city",
          !cities?.length
        )}
        <div className="w-full space-y-1">
          <Label htmlFor="postalCode" className="text-xs text-gray-600 block">
            Postal Code
          </Label>
          <InputNumber
            id="postalCode"
            placeholder="Postal Code"
            className={`flex items-center ${inputClass} ${
              formErrors.postalCode ? "border border-red-400" : ""
            }`}
            value={shippingAddress?.postalCode || ""}
            onChange={(value) => handleChange("postalCode", value ?? "")}
          />
          {formErrors.postalCode && (
            <p className="text-red-500 mt-2 text-xs">Postal is required</p>
          )}
        </div>
      </div>

      {/* Contact Number */}
      <div className="w-full flex gap-3 items-center">
        <Input
          type="text"
          disabled={
            shippingAddress?.countryCode || geoLocation?.countryCallingCode
          }
          placeholder="+91"
          className={`h-10 w-1/4 placeholder:text-gray-100`}
          value={
            shippingAddress?.countryCode || geoLocation?.countryCallingCode
          }
          onChange={(e) => handleChange("countryCode", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Phone Number"
          className={`${inputClass} ${
            formErrors.contactNumber ? "border border-red-400" : ""
          }`}
          value={shippingAddress?.contactNumber || ""}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
        />
        {formErrors.contactNumber && (
          <p className="text-red-500 mt-2 text-xs">Phone number is required</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutShippingAddress;
