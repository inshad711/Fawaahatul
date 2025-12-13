"use client";
import { Button, Form, FormProps, Input, Modal, Space } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { generateCartPayload } from "@/lib/utils";

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

interface formValues {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

const RegisterForm = () => {
  const [form] = useForm();
  const [otpForm] = useForm();
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formValues, setFormValues] = useState<formValues>({});
  const [otpTimer, setOtpTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOtpModalOpen && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOtpModalOpen, otpTimer]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setFormValues(values);

    let guestCartData = [];
    if (typeof localStorage !== "undefined") {
      guestCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
    }
    const cartPayload = generateCartPayload(guestCartData);

    const requestData = {
      cartPayload,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/vendor/customer/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        toast.error(`${result.message || "Internal Server Error"}`);
      } else {
        setIsOtpModalOpen(true);
        setLoading(false);
        setOtpTimer(60);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(`Error: ${error.message || "Internal Server Error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearOtp = () => {
    otpForm.resetFields();
  };

  const handleOtpSubmit = async (values: any) => {
    let guestCartData = [];
    if (typeof localStorage !== "undefined") {
      guestCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
    }
    const cartPayload = generateCartPayload(guestCartData);

    const requestData = {
      cartPayload,
      formValues,
      otp: values.otp,
    };

    try {
      setSubmittingOtp(true);
      const response = await fetch(
        `${process.env.BACKEND}/api/verify-otp-and-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message);
        console.error("Registration Failed");
      } else {
        Cookies.remove(process.env.AUTH_TOKEN!);

        Cookies.set(process.env.AUTH_TOKEN!, result.token, {
          expires: 1,
          sameSite: "None",
          secure: true,
        });

        toast.success("Registered Successfully");
        localStorage.removeItem("guestCart");
        setSubmittingOtp(false);
        setIsOtpModalOpen(false);
        otpForm.resetFields();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!formValues.email) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setResendingOtp(true);

    let guestCartData = [];
    if (typeof localStorage !== "undefined") {
      guestCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
    }

    const cartPayload = generateCartPayload(guestCartData);

    const requestData = {
      cartPayload,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
    };

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/vendor/customer/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Failed to resend OTP");
      } else {
        toast.success("OTP resent successfully");
        setOtpTimer(60);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while resending OTP");
    } finally {
      setResendingOtp(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    toast.error(`Kindly fill all the required fields`);
  };

  return (
    <>
      <div className="bg-templateBackground shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[350px] space-y-2 p-6 rounded-md">
        <div className="space-y-0.5">
          <h2 className="text-lg font-medium text-templateText">Welcome</h2>
          <p className="text-sm text-templateText">
            Login to access your profile
          </p>
        </div>
        <div className="pt-2">
          <Form
            form={form}
            name="register_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Space>
              <Form.Item<FieldType>
                name="first_name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  prefix={<UserRound size={14} className="mr-1" />}
                  placeholder="First Name"
                  className="border-gray-500 text-sm"
                />
              </Form.Item>
              <Form.Item<FieldType>
                name="last_name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  prefix={<UserRound size={14} className="mr-1" />}
                  placeholder="Last Name"
                  className="border-gray-500 text-sm"
                />
              </Form.Item>
            </Space>
            <Form.Item<FieldType>
              name="email"
              className="-mt-2"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<Mail size={14} className="mr-1" />}
                placeholder="Email"
                className="border-gray-500 text-sm"
              />
            </Form.Item>

            <Form.Item
              className="-mt-2"
              name="password"
              rules={[
                { required: true, message: "Please enter your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockKeyhole size={14} className="mr-1" />}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-500 text-sm"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              className="-mt-2 !mb-8"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockKeyhole size={14} className="mr-1" />}
                type="password"
                className="border-gray-500 text-sm"
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center -mt-4 capitalize justify-center w-full gap-2 border border-templatePrimary bg-templatePrimary hover:opacity-90 py-2.5 rounded-md text-sm tracking-widest text-templatePrimaryText font-medium ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading && <LoaderCircle className="animate-spin" size={15} />}
                {loading ? "Registering..." : "Register"}
              </button>
            </Form.Item>

            <p className="text-center -mt-4 text-templateText text-xs">
              Already {process.env.STORE_NAME?.replaceAll("-", " ")} user?{" "}
              <Link
                href={"/auth/login"}
                className="text-templborder-templateBlack underline"
              >
                Login now
              </Link>
            </p>
          </Form>
        </div>
      </div>

      {/* OTP MODAL */}
      <Modal width={400} open={isOtpModalOpen} footer={null}>
        <div className="space-y-4 py-2">
          <h2 className="text-lg font-medium text-center tracking-wide">
            Verify your email
          </h2>
          <p className="text-center text-[0.8rem] tracking-wide">
            An OTP has been sent to{" "}
            <span className="text-templborder-templateBlack underline">
              {formValues?.email}
            </span>{" "}
            Please enter the 6-digit OTP below to verify.
          </p>

          <Form form={otpForm} onFinish={handleOtpSubmit}>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Form.Item
                  rules={[{ required: true, message: "Please enter otp!" }]}
                  name="otp"
                >
                  <Input.OTP disabled={submittingOtp} length={6} />
                </Form.Item>
              </div>

              <Form.Item>
                <div className="flex items-center -mt-2 gap-2">
                  <button
                    onClick={handleClearOtp}
                    disabled={submittingOtp}
                    type="button"
                    className={`flex rounded-md items-center uppercase justify-center w-full gap-2 border border-templatePrimary bg-transparent hover:opacity-90 py-3 text-sm text-templateText font-medium ${
                      submittingOtp && "cursor-not-allowed"
                    }`}
                  >
                    Clear all
                  </button>
                  <button
                    type="submit"
                    disabled={submittingOtp}
                    className={`flex rounded-md items-center uppercase justify-center w-full gap-2 border border-templatePrimary bg-templatePrimary hover:opacity-90 py-3 text-sm text-templatePrimaryText font-medium ${
                      submittingOtp && "cursor-not-allowed"
                    }`}
                  >
                    {submittingOtp && (
                      <LoaderCircle size={15} className="animate-spin" />
                    )}
                    Submit
                  </button>
                </div>
              </Form.Item>
            </div>
          </Form>

          <div className="space-y-2">
            <p className="text-center text-xs text-templateText">
              Didn&apos;t receive the OTP?{" "}
              {otpTimer > 0 ? (
                <span className="text-gray-400">Resend in {otpTimer}s</span>
              ) : (
                <span
                  onClick={handleResendOtp}
                  className={`text-templborder-templateBlack underline cursor-pointer ${
                    resendingOtp ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {resendingOtp ? "Resending..." : "Resend OTP"}
                </span>
              )}
            </p>

            <p
              onClick={() => {
                setIsOtpModalOpen(false);
                form.resetFields();
              }}
              className="text-center text-[11px] text-templateText underline underline-offset-2"
            >
              Cancel Registration
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
