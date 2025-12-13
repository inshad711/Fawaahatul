"use client";

import { Button, Checkbox, Form, Input, Modal, Radio } from "antd";
import {
  BookUser,
  BriefcaseBusiness,
  Building2,
  CircleCheck,
  Ellipsis,
  Home,
  Loader2,
  Mail,
  Notebook,
  NotebookPen,
  Pencil,
  Phone,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import toast, { Toaster } from "react-hot-toast";
import Item from "antd/es/list/Item";
import { useForm } from "antd/es/form/Form";
import AddressCard from "./AddressCard";
import AddressCardSkeleton from "@/components/Skeletons/AddressCardSkeleton";

// ADDRESS TYPE
// 0 Home
// 1 Work
// 2 Other DEFAULT

interface SelectedOption {
  name: string;
  code: string;
  phoneCode?: string;
}

interface Props {
  isCheckoutPage?: boolean;
  storedCustomerData: any;
}

const Address: React.FC<Props> = ({ isCheckoutPage, storedCustomerData }) => {
  const [addressForm] = useForm();
  const [allAddress, setAllAddress] = useState([]);
  const countries = Country.getAllCountries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<SelectedOption | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<SelectedOption | null>(
    null
  );
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [editAddressId, setEditAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storedCustomerData?.manage_address &&
      setAllAddress(storedCustomerData?.manage_address);
    setLoading(false);
  }, [storedCustomerData?.manage_address]);

  // Handlers
  const handleCountryChange = (isoCode: any) => {
    const country = countries.find((c) => c.isoCode === isoCode);

    if (country) {
      setSelectedCountry({
        code: country.isoCode,
        name: country.name,
        phoneCode: country.phonecode,
      });
      setStates(State.getStatesOfCountry(country.isoCode));
      setSelectedState(null); // Reset state when country changes
      setCities([]); // Reset cities when country changes
    }
  };

  const handleStateChange = (stateName: any) => {
    // const stateName = e.target.value;
    const state = states.find((s) => s.name === stateName);

    if (state && selectedCountry) {
      setSelectedState({ code: state.isoCode, name: state.name });
      setCities(City.getCitiesOfState(selectedCountry.code, state.isoCode));
    }
  };

  const splitPhoneNumber = (phones_address: string) => {
    const [phone_code, phone_number] = phones_address.split(" ");
    return { phone_code, phone_number };
  };

  const showModal = (data: any) => {
    setIsModalOpen(true);
    addressForm.resetFields();
    if (data) {
      setEditAddressId(data.id);
      const { phone_code, phone_number } = splitPhoneNumber(
        data.phones_address
      );
      addressForm.setFieldsValue(data);
      addressForm.setFieldValue("address_type", `${data.address_type}`);
      addressForm.setFieldValue("default", `${data.address_type}`);
      addressForm.setFieldValue("phone_code", phone_code);
      addressForm.setFieldValue("phone_number", phone_number);
      handleCountryChange(data.country);
      handleStateChange(data.state);
    }
  };

  const handleCancel = () => setIsModalOpen(!isModalOpen);

  const handleRemoveAddressUpdate = (address: any) => {
    setAllAddress(address);
    toast.success("Address Removed!");
  };

  const handleFinish = async (values: any) => {
    const createdAt = new Date();
    const requestData = {
      customer_id: storedCustomerData?.customer_id,
      first_name: values.first_name,
      last_name: values.last_name,
      country: values.country,
      state: values.state || "",
      city: values.city || "",
      postalcode: values.postalcode,
      address: values.address,
      phones_address: [values.phone_code || "", values.phone_number || ""]
        .filter(Boolean)
        .join(" "),
      created_at: createdAt,
      updated_at: null,
      address_type: Number(values.address_type),
      default_address:
        allAddress?.length === 0 ? true : !!values.default_address,
    };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.BACKEND}/api/addNewAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        setAllAddress(result.allAddresses);
        addressForm.resetFields();
        setIsModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddresUpdate = async (values: any) => {
    const updatedAt = new Date();
    const requestData = {
      id: editAddressId,
      customer_id: storedCustomerData?.customer_id,
      first_name: values.first_name,
      last_name: values.last_name,
      country: values.country,
      state: values.state || "",
      city: values.city || "",
      postalcode: values.postalcode,
      phones_address: [values.phone_code || "", values.phone_number || ""]
        .filter(Boolean)
        .join(" "),
      address: values.address,
      updated_at: updatedAt,
      address_type: Number(values.address_type),
      default_address: !!values.default_address,
    };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.BACKEND}/api/updateAddress`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        // console.log(result);
        toast.error(result.error);
      } else {
        // console.log(result);

        toast.success(result.message);
        setAllAddress(result.allAddresses);
        setIsModalOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="space-y-5">
        {!isCheckoutPage && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-templateText">
              <Notebook size={18} strokeWidth={1.5} />
              <h2 className="text-sm">My Address</h2>
            </div>
            {allAddress?.length < 5 && (
              <div
                onClick={() => showModal(null)}
                className="flex items-center gap-2 cursor-pointer text-templateText hover:text-templatePrimary"
              >
                <NotebookPen size={18} strokeWidth={1.5} />
                <h2 className="text-sm">Add New Address</h2>
              </div>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
            isCheckoutPage ? "2" : "3"
          } gap-4 items-start text-templateText`}
        >
          {loading ? (
            <>
              {Array(3)
                .fill(3)
                .map((_, index) => (
                  <div key={index}>
                    <AddressCardSkeleton />
                  </div>
                ))}
            </>
          ) : (
            <>
              {allAddress?.length < 1 ? (
                <div className="py-4">
                  No address found{" "}
                  <span
                    onClick={() => showModal(null)}
                    className="underline cursor-pointer"
                  >
                    Add Now
                  </span>
                </div>
              ) : (
                <>
                  {allAddress?.map((item: any, index: number) => (
                    <div key={index}>
                      <AddressCard
                        isCheckoutPage={isCheckoutPage}
                        email={storedCustomerData?.email}
                        showModal={showModal}
                        data={item}
                        handleRemoveAddressUpdate={handleRemoveAddressUpdate}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        width={500}
        style={{ top: "20px" }}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="pt-2">
          <Form
            form={addressForm}
            onFinish={editAddressId ? handleAddresUpdate : handleFinish}
            size="large"
          >
            <div className="flex gap-4">
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="first_name"
              >
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="First name"
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "This field is requried!" }]}
                name="last_name"
                className="w-full"
              >
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="Last name"
                />
              </Form.Item>
            </div>
            <div className="flex gap-2">
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="country"
              >
                <select
                  required
                  className="w-full border-b bg-transparent  p-2"
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select a country
                  </option>
                  {countries.map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="state"
              >
                <select
                  required
                  className="w-full border-b bg-transparent  p-2"
                  onChange={(e) => handleStateChange(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select a state
                  </option>
                  {states.map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Item>
            </div>
            <div className="flex gap-2">
              <Form.Item className="w-full" name="city">
                <select className="w-full border-b bg-transparent  p-2">
                  <option value="" disabled selected>
                    Select a city
                  </option>
                  {cities.map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="postalcode"
              >
                <input
                  type="number"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="Postal code"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item
                className="w-[20%]"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="phone_code"
              >
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="+91"
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "This field is requried!" }]}
                name="phone_number"
                className="w-[80%]"
              >
                <input
                  type="number"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="phone"
                />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="address"
              >
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent  focus:ring-0 appearance-none p-2"
                  placeholder="Address"
                />
              </Form.Item>
            </div>
            <div className="-mt-4">
              <Form.Item
                className="w-full"
                rules={[{ required: true, message: "This field is requried!" }]}
                name="address_type"
              >
                <Radio.Group>
                  {[
                    { id: "0", label: "Home" },
                    { id: "1", label: "Work" },
                    { id: "2", label: "Other" },
                  ].map((item, index) => (
                    <Radio key={index} value={item.id}>
                      {" "}
                      {item.label}{" "}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="-mt-4">
              <Form.Item
                className="w-full"
                valuePropName="checked"
                name="default_address"
              >
                <Checkbox>Use this address as my default address</Checkbox>
              </Form.Item>
            </div>
            <div className="-mt-4">
              <Form.Item>
                {editAddressId ? (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-templateText text-white py-2 px-6 rounded hover:opacity-90"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Update Address
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-templateText text-white py-2 px-6 rounded hover:opacity-90"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Add Address
                  </button>
                )}
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Address;
