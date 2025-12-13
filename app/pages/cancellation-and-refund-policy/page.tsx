import PolicyContainer from "@/components/Policies/PolicyContainer";
import RefuncReturnPolicy from "@/components/Policies/RefuncReturnPolicy";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { policyService } from "@/services/policyService";
import { Metadata } from "next";
import React from "react";

export const revalidate = 10;

export const metadata: Metadata = {
  title: `Cancellation and Refund Policy | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/cancellation-and-refund-policy`,
  },
};

const Cancellationandrefundpolicy = async () => {
  const policy = await policyService.getPolicy("return_refund_policy");
  if (!policy.success) {
    return (
      <div className="max-w-4xl space-y-6 text-center text-xl md:text-2xl mx-auto px-4 py-8 md:py-10 lg:py-20">
        No return and refund policy found
      </div>
    );
  }

  return (
    <PolicyContainer
      title="Return and Refund policy"
      policy={policy.data.return_refund_policy}
    />
  );
};

export default Cancellationandrefundpolicy;
