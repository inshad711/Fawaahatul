"use server";

import { send } from "../configuration";
import { contactFormTemplate } from "./Template";

interface SendFuncProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactEnquiry: React.FC<SendFuncProps> = async ({
  name,
  email,
  phone,
  message,
}) => {
  const emailBody = contactFormTemplate({
    name,
    email,
    phone,
    message,
  });

  try {
    await send({
      to: process.env.STORE_EMAIL || "",
      name: process.env.STORE_NAME || "",
      subject: `Contact Form Enquiry ( ${process.env.STORE_NAME} )`,
      body: emailBody,
    });

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failed to send email
  }
};
