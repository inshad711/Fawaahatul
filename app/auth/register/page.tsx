import RegisterForm from "@/components/Forms/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
  },
};

const Register = () => {
  return (
    <div className="bg-templateGray">
      <div className="templateContainer py-16 flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
