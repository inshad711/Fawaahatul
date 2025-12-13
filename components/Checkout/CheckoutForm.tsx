// "use client";
// import { CircleCheckBig, Loader, Loader2Icon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../ui/button";
// import Cookies from "js-cookie";
// import DeliveryForm from "./DeliveryForm";
// import PaymentForm from "./PaymentForm";
// import ShippingMethod from "./ShippingMethod";
// import PayButton from "./PayButton";
// import toast from "react-hot-toast";
// import {
//   ConfirmationResult,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { auth } from "@/app/firebase";
// import { Input } from "../ui/input";
// import { updateCustomerDataFields } from "@/store/slice/sCheckout";
// import { RootState } from "@/store/store";
// import { emailService } from "@/services/emailService";
// import CheckoutAddressSelect from "./CheckoutAddressSelect";

// interface Props {
//   userEmail: any;
// }

// const CheckoutForm: React.FC<Props> = ({ userEmail }) => {
//   const dispatch = useDispatch();
//   const checkoutData = useSelector((state: RootState) => state.checkoutData);
//   const [inputValue, setInputValue] = useState("");
//   const [isValid, setIsValid] = useState(false);
//   const [inputType, setInputType] = useState<"email" | "phone" | null>(
//     userEmail || null
//   );
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
//     null
//   );
//   const [verified, setVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const storedCustomerData = useSelector(
//     (state: RootState) => state.customerData.customerData
//   );
//   // const checkoutData = useSelector((state: RootState) => state.checkoutPage);
//   const token = Cookies.get(process.env.AUTH_TOKEN!);

//   useEffect(() => {
//     const value = inputValue.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\+[1-9]\d{7,14}$/;

//     if (!value) {
//       setIsValid(false);
//       setInputType(null);
//     } else if (phoneRegex.test(value)) {
//       setIsValid(true);
//       setInputType("phone");
//     } else if (emailRegex.test(value)) {
//       setIsValid(true);
//       setInputType("email");
//     } else {
//       setIsValid(false);
//       setInputType(null);
//     }
//   }, [inputValue]);

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             // console.log("reCAPTCHA solved");
//           },
//         }
//       );
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isValid && inputType === "phone") {
//       try {
//         setLoading(true);
//         setupRecaptcha();
//         const appVerifier = window.recaptchaVerifier;
//         const confirmationResult = await signInWithPhoneNumber(
//           auth,
//           inputValue,
//           appVerifier
//         );
//         setConfirmation(confirmationResult);
//         setOtpSent(true);
//       } catch (err) {
//         console.error("OTP send error:", err);
//       } finally {
//         setLoading(false);
//       }
//     } else if (isValid && inputType === "email") {
//       try {
//         setLoading(true);
//         const requestedData = {
//           email: inputValue,
//         };
//         const response = await emailService.sendOtpOnMail(requestedData);
//         if (response.success) {
//           setLoading(false);
//           setOtpSent(true);
//         } else {
//           toast("Something went wrong");
//         }
//       } catch (error) {
//         console.error("Error while sending OTP on email", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleVerify = async () => {
//     if (inputType === "phone" && confirmation) {
//       try {
//         setVerifying(true);
//         await confirmation.confirm(otp);
//         setVerified(true);
//         toast("Phone number verified successfully!");
//         dispatch(
//           updateCustomerDataFields({
//             phone: inputValue,
//             type: "guest",
//           })
//         );
//       } catch (err) {
//         console.error("OTP verification failed:", err);
//         toast("Invalid OTP");
//       } finally {
//         setVerifying(false);
//       }
//     } else if (inputType === "email") {
//       try {
//         setVerifying(true);
//         const requestedData = {
//           email: inputValue,
//           otp: otp,
//         };
//         const response: any = await emailService.verifyOtp(requestedData);
//         if (response.success) {
//           setVerified(true);
//           // console.log(response);
//           toast("Email verified successfully");
//           dispatch(
//             updateCustomerDataFields({
//               email: inputValue,
//               type: response.is_customer ? "user" : "guest",
//             })
//           );
//         } else {
//           // console.log(response);
//           toast("Something went wrong");
//         }
//       } catch (error) {
//       } finally {
//         setVerifying(false);
//       }
//     }
//   };

//   return (
//     <>
//       <div id="recaptcha-container"></div>

//       {userEmail ? (
//         <div>
//           <Input value={userEmail} disabled />
//         </div>
//       ) : (
//         <div className="space-y-3">
//           <div className="flex text-lg tracking-wide items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
//             {/* {!token && mailCheckResponse?.type !== "guest" && (
//             <Link href={"/auth/login"} className="text-sm underline block">
//               Login
//             </Link>
//           )} */}
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="flex items-center gap-2">
//               <Input
//                 placeholder="Enter email or phone"
//                 value={inputValue}
//                 onChange={(e) => {
//                   let val = e.target.value;
//                   if (val.match(/^\d+$/)) {
//                     val = "+" + val; // naive helper
//                   }
//                   setInputValue(val);
//                 }}
//                 disabled={otpSent}
//               />
//               {verified ? (
//                 <div>
//                   <CircleCheckBig size={18} color="green" />
//                 </div>
//               ) : (
//                 <Button type="submit" disabled={!isValid || otpSent || loading}>
//                   Get OTP{" "}
//                   {loading && <Loader className="animate-spin" size={18} />}
//                 </Button>
//               )}
//             </div>
//           </form>

//           {otpSent && !verified && (
//             <div className="flex items-center gap-2">
//               <Input
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <Button disabled={verifying} onClick={handleVerify}>
//                 Verify OTP{" "}
//                 {verifying && <Loader className="animate-spin" size={18} />}
//               </Button>
//             </div>
//           )}
//         </div>
//       )}

//       {checkoutData.customerData && (
//         <>
//           <div>
//             <CheckoutAddressSelect />
//           </div>
//           <DeliveryForm />
//           {/* {checkoutData?.shippingAddress?.address && <DeliveryForm />}
//           {storedCustomerData?.manage_address &&
//           storedCustomerData?.manage_address?.length > 0 ? (
//             <div>
//               <CheckoutAddressSelect />
//             </div>
//           ) : (
//             <DeliveryForm />
//           )} */}

//           {checkoutData?.shippingAddress?.pincode && <ShippingMethod />}
//           <PaymentForm />
//           <PayButton />
//         </>
//       )}
//     </>
//   );
// };

// export default CheckoutForm;

import React from "react";

const CheckoutForm = () => {
  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
