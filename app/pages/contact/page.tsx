import ContactFormNew from '@/components/Forms/ContactFormNew'
import FaqContact from '@/components/Forms/FaqContact'
import React from 'react'
import { defaultMetadata } from "@/lib/defaultMetadata";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Contact Us | ${defaultMetadata.title}`,
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/contact-us`,
    },
};

const ContactPage = () => {
    return (
        <div>
            <div> <ContactFormNew /> </div>
            <div><FaqContact /> </div>
        </div>
    )
}

export default ContactPage