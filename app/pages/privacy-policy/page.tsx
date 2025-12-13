import PolicyContainer from "@/components/Policies/PolicyContainer";
import RefuncReturnPolicy from "@/components/Policies/RefuncReturnPolicy";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { policyService } from "@/services/policyService";
import { Metadata } from "next";
import React from "react";

export const revalidate = 10;

export const metadata: Metadata = {
  title: `Privacy Policy | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/privacy-policy`,
  },
};

const PrivacyPolicy = async () => {
  const policy = await policyService.getPolicy("privacy_policy");
  if (!policy.success) {
    return (
      <div className="max-w-4xl space-y-6 text-center text-xl md:text-2xl mx-auto px-4 py-8 md:py-10 lg:py-20">
        No privacy policy found
      </div>
    );
  }

  return (
    <PolicyContainer
      title="Privacy Policy"
      policy={policy.data.privacy_policy}
    />
  );
};

export default PrivacyPolicy;
