"use client";
import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [otpForm] = useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState<string | null>();
  const [flag, setFlag] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isModalOpen && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isModalOpen, resendTimer]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleGetOtp = async (e: any) => {
    if (e?.preventDefault) e.preventDefault();
    const requestData = { email };

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/forgot-password-get-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to send OTP");
      } else {
        toast.success(result.message || "OTP sent");
        showModal();
        setResendTimer(60); // Start 60s countdown
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (values: any) => {
    const requestData = {
      email,
      otp: values.otp,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/forgot-password-verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "OTP verification failed");
      } else {
        toast.success(result.message || "OTP verified");
        otpForm.resetFields();
        setIsModalOpen(false);
        setFlag(true);
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNewPassword = async (values: any) => {
    const requestData = {
      email,
      password: values.newPassword,
    };
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/forgot-password-update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Password update failed");
      } else {
        toast.success(result.message || "Password updated");
        otpForm.resetFields();
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Internal Server Error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return toast.error("Email is missing");

    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/forgot-password-get-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to resend OTP");
      } else {
        toast.success(result.message || "OTP resent");
        setResendTimer(60); // restart timer
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {flag ? (
        <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[350px] space-y-4 p-6 rounded-md">
          <h2 className="text-xl text-templateText text-center">
            Set new password
          </h2>
          <Form
            form={otpForm}
            onFinish={handleUpdateNewPassword}
            className="w-full text-center"
            size="large"
          >
            <Form.Item name="newPassword">
              <Input.Password
                placeholder="New password"
                className="w-full text-center"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                } flex rounded-lg items-center uppercase justify-center w-full gap-2 border border-templateText bg-templateText py-3 text-sm text-white font-medium`}
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                Verify
              </button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[350px] space-y-4 p-6 rounded-md">
          <div className="space-y-3">
            <h2 className="text-lg text-templateText">Forgot Your Password?</h2>
            <p className="text-[0.8rem] text-templateText tracking-wide">
              Enter your email address, and we’ll send you a 6 digit One-Time
              Password (OTP) to verify your identity and reset your password.
            </p>
          </div>
          <form onSubmit={handleGetOtp}>
            <div className="mb-4">
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded border-gray-300 shadow-sm focus:border-black focus:ring-black px-3 py-2.5 text-base border outline-none"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              } flex rounded items-center justify-center w-full gap-2 border border-templateText bg-templateText py-3 text-sm text-white font-medium`}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              Get code
            </button>
            <p className="text-center mt-2 text-templateText text-xs">
              <Link href="/auth/login" className="text-templateText underline">
                Login ?
              </Link>
            </p>
          </form>
        </div>
      )}

      <Modal width={400} open={isModalOpen} footer={null}>
        <div className="space-y-4 px-5 pb-5 pt-8">
          <div className="space-y-2">
            <h2 className="text-base text-center font-medium text-templateText">
              Enter OTP Verification Code
            </h2>
            <p className="text-xs text-templateText text-center">
              We’ve sent a 6-digit OTP to your registered email address.
            </p>
          </div>

          <Form
            form={otpForm}
            onFinish={handleOtpVerify}
            className="w-full text-center"
          >
            <Form.Item name="otp">
              <Input.OTP length={6} className="w-full text-center" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                } flex rounded-lg items-center uppercase justify-center w-full gap-2 border border-templateText bg-templateText py-3 text-sm text-white font-medium`}
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                Verify
              </button>
            </Form.Item>
          </Form>

          <p className="text-xs text-templateText text-center">
            Didn’t receive the code?{" "}
            {resendTimer > 0 ? (
              <span className="text-gray-500">Resend in {resendTimer}s</span>
            ) : (
              <span
                onClick={handleResendOtp}
                className={`text-templateText underline cursor-pointer ${
                  isResending ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </span>
            )}
          </p>
          <p
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="text-center cursor-pointer text-[11px] text-templateText underline underline-offset-2"
          >
            Cancel
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPasswordForm;
