"use client";
import { Form, message } from "antd";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { sendContactEnquiry } from "@/lib/nodemailer/ContactForm/sendContactForm";
import { CheckCircle, Loader, XCircle } from "lucide-react";

const ContactForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const result = await sendContactEnquiry(values);
      if (result) {
        setIsSuccess(true);
        form.resetFields();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsSuccess(false);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4 md:space-y-6 mx-auto p-4">
      <h1 className="text-4xl text-center tracking-wide uppercase">
        Contact Us
      </h1>

      {isSuccess && (
        <div className=" text-green-500 flex items-center gap-2 rounded-md">
          <CheckCircle size={20} />
          <p>Email sent successfully</p>
        </div>
      )}

      {isError && (
        <div className=" text-red-500 flex items-center gap-2 rounded-md">
          <XCircle size={20} />
          <p>Failed to send email</p>
        </div>
      )}

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {/* Name Field */}
          <Form.Item
            name="name"
            label={<span className="tracking-wide">Name</span>}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="email"
            label={<span className="tracking-wide">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input disabled={isLoading} type="email" />
          </Form.Item>

          {/* Message Field */}
          <Form.Item
            name="message"
            label={<span className="tracking-wide">Message</span>}
            className="col-span-2"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <Textarea className="h-28 md:h-40" disabled={isLoading} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="col-span-2">
            <Button
              type="submit"
              className="w-full bg-templatePrimary text-templatePrimaryText"
              disabled={isLoading}
            >
              {isLoading && <Loader size={16} className="animate-spin" />}
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
