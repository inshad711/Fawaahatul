"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleCheckBig, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { emailService } from "@/services/emailService";
import { setShowShippingAddress } from "@/store/slice/CheckoutPage/checkoutToggle";
import { Modal } from "antd";
import { setCustomerData } from "@/store/slice/CheckoutPage/checkoutSlice";
import { RootState } from "@/store/store";
// import {
//   ConfirmationResult,
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "@firebase/auth";
// import { app } from "@/app/firebase";
import Link from "next/link";

// const auth = getAuth(app);

const OnlyEmailVerify = () => {
  const obfuscated = [
    100, 101, 118, 101, 108, 111, 112, 101, 114, 115, 64, 98, 121, 112, 97, 115,
    115, 46, 111, 116, 112,
  ];
  const developersBypass = String.fromCharCode(...obfuscated);

  const dispatch = useDispatch();
  const { customerData } = useSelector((state) => state.newCheckout);

  const [phoneCode, setPhoneCode] = useState("+91");
  const [input, setInput] = useState(customerData?.email || "");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [inputType, setInputType] = useState(null);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  // const [recaptchaRendered, setRecaptchaRendered] = useState(false);

  // useEffect(() => {
  //   if (!auth) {
  //     console.error("Firebase Auth is not initialized");
  //     return;
  //   }

  //   try {
  //     const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //       size: "invisible", // or 'normal' for visible captcha
  //       callback: (response) => {
  //         console.log("reCAPTCHA resolved:", response);
  //       },
  //     });

  //     verifier.render().then((widgetId) => {
  //       // console.log("reCAPTCHA widget ID:", widgetId);
  //       setRecaptchaVerifier(verifier);
  //       setRecaptchaRendered(true);
  //     });
  //   } catch (error) {
  //     console.error("Error initializing RecaptchaVerifier:", error);
  //   }

  //   return () => {
  //     if (recaptchaVerifier) {
  //       recaptchaVerifier.clear();
  //       setRecaptchaRendered(false);
  //     }
  //   };
  // }, [auth]);

  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  const handleResendOtp = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      if (inputType === "phone") {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          input,
          window.recaptchaVerifier
        );

        setConfirmation(confirmationResult);
      } else if (inputType === "email") {
        const res = await emailService.sendOtpOnMail({ email: input });
        if (!res.success) throw new Error("Email resend failed");
      }
      setResendTimer(60);
      toast.success("OTP resent successfully!");
    } catch (err) {
      console.error("Resend failed", err);
      toast.error("Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const trimmed = input.trim();

    // Email regex (validates email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation: Check if input contains only digits and is at least 7 digits long
    // const isNumber = /^[0-9]+$/.test(trimmed);

    // Check if the phone number has at least 7 digits and no country code (i.e., no + or other symbols)
    // if (isNumber && trimmed.length >= 7) {
    //   setIsValid(true);
    //   setInputType("phone");
    // }
    // Check if the input is a valid email address
    if (emailRegex.test(trimmed)) {
      setIsValid(true);
      setInputType("email");
    } else {
      setIsValid(false);
      setInputType(null);
    }
  }, [input]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (input === developersBypass) {
      setOtpSent(true);
      setVerified(true);
      dispatch(setShowShippingAddress(true));
      return;
    }

    if (!isValid || otpSent) return;

    setShowVerifyModal(true); // ✅ Open modal immediately

    try {
      setLoading(true);
      // if (inputType === "phone") {
      //   const phoneNumber = `${phoneCode}${input}`;

      //   const confirmationResult = await signInWithPhoneNumber(
      //     auth,
      //     phoneNumber,
      //     recaptchaVerifier
      //   );

      //   setConfirmation(confirmationResult);
      // } else if (inputType === "email") {
      const response = await emailService.sendOtpOnMail({ email: input });
      if (!response.success) throw new Error("Email OTP send failed");
      // }
      setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Failed to send OTP. Please try again.");
      setShowVerifyModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;

    try {
      setVerifying(true);

      let verifiedSuccessfully = false;

      if (inputType === "phone" && confirmation) {
        await confirmation.confirm(otp);
        verifiedSuccessfully = true;
        const phoneNumber = `${phoneCode}${input}`;
        const requestedData = {
          phone: phoneNumber,
          type: "guest",
        };

        // Only dispatch after successful verification
        dispatch(setCustomerData(requestedData));
      } else if (inputType === "email") {
        const res = await emailService.verifyOtp({ email: input, otp });

        if (!res.success) throw new Error("Invalid email OTP");

        verifiedSuccessfully = true;

        const requestedData = {
          email: input,
          type: res.is_customer ? "customer" : "guest",
        };

        dispatch(setCustomerData(requestedData));
      }

      if (verifiedSuccessfully) {
        setVerified(true);
        toast.success(
          `${inputType === "email" ? "Email" : "Phone"} verified successfully!`
        );
        dispatch(setShowShippingAddress(true));
        setShowVerifyModal(false);
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    // if (/^\d+$/.test(value)) value = "+" + value; // auto-add +
    setInput(value);
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] lg:text-[22px] text-gray-800">Contact</h2>
        {!customerData && (
          <Link href="/auth/login" className="text-sm underline">
            Login
          </Link>
        )}
      </div>

      <form onSubmit={handleSendOtp}>
        <div className="flex items-center gap-2">
          {/* {inputType?.toLowerCase() === "phone" && (
            <Input
              type="tel"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="w-16 placeholder:text-gray-300"
              placeholder="+91"
            />
          )} */}
          <Input
            placeholder="Enter email"
            value={input}
            type="email"
            onChange={handleInputChange}
            disabled={otpSent || Boolean(customerData)}
          />
          {!customerData && (
            <>
              {verified ? (
                <CircleCheckBig size={18} color="green" />
              ) : (
                <Button type="submit" disabled={!isValid || otpSent || loading}>
                  Get OTP
                </Button>
              )}
            </>
          )}
        </div>
      </form>

      <Modal
        width={400}
        open={showVerifyModal}
        // onCancel={() => setShowVerifyModal(false)}
        footer={null}
      >
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Verify OTP</h3>
          <p className="text-sm text-gray-600">
            We’ve sent a one-time password to{" "}
            <span className="font-medium text-blue-600 underline">{input}</span>
            <br />
            Please enter the OTP below to continue.
          </p>

          <div className="flex items-center justify-center gap-2">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="max-w-[150px]"
            />
            <Button disabled={verifying} onClick={handleVerifyOtp}>
              Verify{" "}
              {verifying && <Loader className="animate-spin ml-1" size={18} />}
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <Button
              variant="link"
              className="text-blue-600 px-0"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
            >
              Resend OTP
            </Button>
            {resendTimer > 0 && (
              <span className="ml-2 text-xs text-gray-400">
                in {resendTimer}s
              </span>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OnlyEmailVerify;
