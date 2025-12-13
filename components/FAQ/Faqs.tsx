"use client";
import React, { useState } from "react";

type FAQsProps = {
  data: {
    question: string;
    answer: string;
  }[];
};

const Faqs: React.FC<FAQsProps> = ({ data }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (itemValue: string) => {
    setOpenItem((prevValue) => (prevValue === itemValue ? null : itemValue));
  };

  return (
    <div className="templateContainer py-10 space-y-8">
      <div className="space-y-2">
        <h2 className="sectionHeading text-black">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center">
          <p className="lg:max-w-[40rem] text-[14px] font-extralight text-center">
            Here are answers to common questions about our services.
          </p>
        </div>
      </div>
      <div className="max-w-[50rem] mx-auto">
        <div className="">
          <div>
            {data.map((faq, index) => (
              <div key={index} className="text-white border-b border-mildGold">
                {/* Question */}
                <button
                  className={`w-full flex cursor-pointer  justify-between items-center px-4 py-6 text-left tracking-wider text-[#242424] hover:bg-gray-50 focus:outline-none ${
                    openItem === faq.question ? "" : ""
                  }`}
                  onClick={() => handleToggle(faq.question)}
                >
                  <span className="text-sm font-normal">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transform transition-transform duration-500 ${
                      openItem === faq.question ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openItem === faq.question ? "max-h-40" : "max-h-0"
                  }`}
                  style={{
                    maxHeight: openItem === faq.question ? "1000px" : "0px",
                  }}
                >
                  <div className="p-4 text-gray-500 text-[13px]  tracking-wider">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
