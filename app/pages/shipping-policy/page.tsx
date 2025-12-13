import PolicyContainer from "@/components/Policies/PolicyContainer";
import RefuncReturnPolicy from "@/components/Policies/RefuncReturnPolicy";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { policyService } from "@/services/policyService";
import { Metadata } from "next";
import React from "react";

export const revalidate = 10;

export const metadata: Metadata = {
  title: `Shipping Policy | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/shipping-policy`,
  },
};

const ShippingPolicy = async () => {
  const policy = await policyService.getPolicy("shipping_policy");

  if (!policy.success) {
    return (
      <div className="max-w-4xl space-y-6 text-center text-xl md:text-2xl mx-auto px-4 py-8 md:py-10 lg:py-20">
        No shipping policy found
      </div>
    );
  }

  return (
    <PolicyContainer
      title="Shipping Policy"
      policy={policy.data.shipping_policy}
    />
  );
};

export default ShippingPolicy;
