import LoginForm from "@/components/Forms/LoginForm";
import LoginWIthEmailOtp from "@/components/Forms/LoginWIthEmailOtp";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  },
};

const Login = () => {
  return (
    <div className="">
      <div className="templateContainer  py-16 flex items-center justify-center">
        <LoginWIthEmailOtp />
      </div>
    </div>
  );
};

export default Login;
