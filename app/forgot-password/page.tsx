import ForgotPasswordForm from "@/components/Forms/ForgotPasswordForm";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Forgot Password | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
  },
};

const ForgotPassword = () => {
  return (
    <div className="">
      <div className="templateContainer py-16 flex items-center justify-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
