"use client";
import { Form, FormProps, Input } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useForm } from "antd/es/form/Form";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { generateCartPayload } from "@/lib/utils";

type FieldType = {
  password?: string;
  email?: string;
};

const LoginForm = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  let guestCartData = [];
  if (typeof localStorage !== "undefined") {
    guestCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
  }
  const cartPayload = generateCartPayload(guestCartData);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const requestData = {
      cartPayload,
      email: values.email,
      password: values.password,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/vendor/customer/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorResult = await response.json();
        handleError(response.status, errorResult.error);
        return;
      }

      const result = await response.json();

      // Remove if any existing FCAT cookie
      Cookies.remove(process.env.AUTH_TOKEN!);

      // Set the new FCAT cookie
      Cookies.set(process.env.AUTH_TOKEN!, result.token, {
        expires: 1,
        sameSite: "None",
        secure: true,
      });
      // document.cookie = `FCAT=${result.token}; path=/; SameSite=None; Secure`;

      toast.success("Logged In!");
      localStorage.removeItem("guestCart");

      setTimeout(() => {
        // if (checkoutRef) {
        //   window.location.href = "/checkout";
        // } else {
        window.location.href = "/";
        // }
      }, 1000);
    } catch (error: unknown) {
      console.error("Internal Server Error");
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleError = (status: number, errorMessage: string) => {
    switch (status) {
      case 400:
        toast.error("Invalid request. Please check your input.");
        break;
      case 401:
        toast.error("Unauthorized access. Please check your credentials.");
        break;
      case 403:
        toast.error("Access forbidden. You do not have permission.");
        break;
      case 404:
        toast.error(errorMessage || "Resource not found.");
        break;
      case 500:
        toast.error("Server error. Please try again later.");
        break;
      default:
        toast.error(errorMessage || "An unknown error occurred.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {};

  return (
    <>
      <div className="bg-templateBackground shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[330px] space-y-4 p-6 rounded-md">
        <div className="space-y-0.5">
          <h2 className="text-lg font-medium text-templateText">Welcome</h2>
          <p className="text-sm text-templateText">
            Login to access your profile
          </p>
        </div>
        <div className="pt-2">
          <Form
            form={form}
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Form.Item<FieldType>
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                className="border-gray-500 text-sm"
              />
            </Form.Item>

            <Form.Item<FieldType>
              className="-mt-2"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                className="border-gray-500  text-sm"
                placeholder="Password"
              />
            </Form.Item>

            <div className="-mt-3 mb-4">
              <Link
                href={"/forgot-password"}
                className="text-right block  text-xs tracking-wide font-medium cursor-pointer hover:text-templateText text-templatePrimary"
              >
                Forgot your password ?
              </Link>
            </div>

            <div>
              <Form.Item>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center -mt-4 capitalize justify-center w-full gap-2 border border-templatePrimary bg-templatePrimary hover:opacity-90 py-2.5 rounded-md text-sm tracking-widest text-templatePrimaryText font-medium ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {loading && (
                    <LoaderCircle className="animate-spin" size={15} />
                  )}
                  {loading ? "Logging..." : "Log In"}
                </button>
              </Form.Item>
              <p className="text-center -mt-4 text-templateText capitalize text-xs">
                New to {process.env.STORE_NAME?.replaceAll("-", " ")} ?{" "}
                <Link
                  href={"/auth/register"}
                  className="text-templatePrimary underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
