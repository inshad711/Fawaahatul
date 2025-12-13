import { useEffect, useState } from "react";
import { Search, HelpCircle, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox, InputNumber } from "antd";
import AddressSearch from "./AddressSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerData,
  setFormErrors,
  setShippingAddress,
} from "@/store/slice/sCheckout";
import { RootState } from "@/store/store";
import { Country } from "country-state-city";

export default function DeliveryForm() {
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const formData = useSelector(
    (state: RootState) => state.checkoutsNew?.shippingAddress
  );
  const { formErrors: errors } = useSelector(
    (state: RootState) => state.checkoutsNew
  );

  useEffect(() => {
    const countryList = Country.getAllCountries().map(({ name, isoCode }) => ({
      name,
      isoCode,
    }));
    setCountries(countryList);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, type, checked } = e.target;

    let updatedData = {
      ...formData, // ✅ Redux state ka current data
      [name]: type === "checkbox" ? checked : value,
    };

    // Agar country change ho raha hai toh address, city, state, aur pincode reset kar do
    if (name === "country") {
      updatedData = {
        ...updatedData,
        address: "",
        city: "",
        state: "",
        pincode: "",
        isSelected: false,
      };
    }

    // ✅ Redux store update karo
    dispatch(setShippingAddress(updatedData));

    // ✅ Validation hatao agar error hai
    if (errors[name]) {
      dispatch(setFormErrors({ ...errors, [name]: "" }));
    }
  };

  const onAddressChange = (addressDetail: any) => {
    const updatedAddress = {
      ...formData, // ✅ Redux store ka existing data
      address: addressDetail.full_address || "",
      city: addressDetail.city || "",
      state: addressDetail.state || "",
      pincode: addressDetail.pincode || "",
      isSelected: addressDetail?.isSelected || false,
    };

    // ✅ Redux store update karo
    dispatch(setShippingAddress(updatedAddress));

    // ✅ Address validation hatao agar fill ho gaya
    dispatch(
      setFormErrors({
        ...errors,
        address: addressDetail.full_address ? "" : errors.address,
        city: addressDetail.city ? "" : errors.city,
        state: addressDetail.state ? "" : errors.state,
        pincode: addressDetail.pincode ? "" : errors.pincode,
      })
    );
  };

  // const { cartItems } = useSelector((state: RootState) => state.checkoutsNew)
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Delivery</h2>
      <form className="space-y-2 lg:space-y-4">
        {/* Country/Region */}
        {/* <pre>
                    {JSON.stringify(formData, null, 2)}
                    {JSON.stringify(cartItems, null, 2)}
                </pre> */}
        <div className="relative">
          <Label htmlFor="country" className="text-xs text-gray-600 mb-1 block">
            Country/Region
          </Label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData?.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* First name and Last name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
          <div>
            <Label className="text-xs tracking-wide" htmlFor="firstName">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              className={`border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 w-full`}
            />
            {errors.firstName && (
              <p className="text-red-500 mt-2 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label className="text-xs tracking-wide" htmlFor="lastName">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              className={`border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 w-full`}
            />
            {errors.lastName && (
              <p className="text-red-500 mt-2 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Apartment */}
        <div>
          <Label className="text-xs tracking-wide" htmlFor="apartment">
            House No. / Building Name *
          </Label>
          <Input
            id="apartment"
            name="apartment"
            value={formData?.apartment}
            onChange={handleChange}
            className={`border ${
              errors.apartment ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 px-3 w-full`}
          />
          {errors.apartment && (
            <p className="text-red-500 mt-2 text-xs">{errors.apartment}</p>
          )}
        </div>

        {/* Address */}

        {storedCustomerData ? (
          <>Iput</>
        ) : (
          <div className="relative">
            <AddressSearch
              countrySelected={formData?.country}
              isError={errors.address}
              address={formData?.address}
              onAddressChange={onAddressChange}
            />
            {errors.address && (
              <p className="text-red-500 mt-2 text-xs">{errors.address}</p>
            )}
          </div>
        )}

        {/* City, State, PIN code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
          <div>
            <Label className="text-xs tracking-wide" htmlFor="city">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={formData?.city}
              onChange={handleChange}
              disabled={!formData?.isSelected && !errors?.city}
              className={`border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 w-full`}
            />
            {errors.city && (
              <p className="text-red-500 mt-2 text-xs">{errors.city}</p>
            )}
          </div>
          <div>
            <Label className="text-xs tracking-wide" htmlFor="state">
              State
            </Label>

            <Input
              id="state"
              name="state"
              value={formData?.state}
              disabled={!formData?.isSelected && !errors?.state}
              className={`border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 w-full`}
            />
            {errors.state && (
              <p className="text-red-500 mt-2 text-xs">{errors.state}</p>
            )}
          </div>

          <div>
            <Label className="text-xs tracking-wide" htmlFor="pincode">
              Pincode
            </Label>

            <Input
              id="pincode"
              name="pincode"
              type="number"
              value={formData?.pincode}
              onChange={handleChange}
              disabled={!formData?.isSelected && !errors?.pincode}
              className={`border ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 w-full`}
            />
            {errors.pincode && (
              <p className="text-red-500 mt-2 text-xs">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label className="text-xs tracking-wide" htmlFor="phone">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            maxLength={12}
            className={`border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 px-3 w-full`}
          />
          {errors.phone && (
            <p className="text-red-500 mt-2 text-xs">{errors.phone}</p>
          )}
        </div>

        {/* Save information for next time */}
        <div className="flex items-center space-x-2">
          <Checkbox
            name="saveInfo"
            id="saveInfo"
            checked={formData?.saveInfo}
            onChange={handleChange as any}
          />
          <Label className="text-xs tracking-wide" htmlFor="saveInfo">
            Save this information for next time
          </Label>
        </div>
      </form>
    </div>
  );
}
