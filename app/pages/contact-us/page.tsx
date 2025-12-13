import ContactForm from "@/components/Forms/ContactForm";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Contact Us | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/contact-us`,
  },
};

const ContactUs = () => {
  return (
    <div className="templateContainer py-6 md:py-8 lg:py-16">
      <ContactForm />
    </div>
  );
};

export default ContactUs;
