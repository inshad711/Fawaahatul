import { GalleryVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

const IconWithText = () => {
  const data = [
    {
      img: "/assets/svgs/original.svg",
      heading: "100% Original Brands",
      content: `We deal only in authentic, original-brand collectible toys—no fakes, no replicas.`,
    },
    {
      img: "/assets/svgs/unboxing-video.svg",
      heading: "Packaging Video Proof",
      content: `Every order is packed with care, and a video is shared on WhatsApp before dispatch.`,
    },
    {
      img: "/assets/svgs/shop (1).svg",
      heading: "India's Top Collector Store",
      content: `Join thousands of collectors who trust HutzDiecast for rare and premium models.`,
    },
    {
      img: "/assets/svgs/express.svg",
      heading: "Fast Dispatch",
      content: `Your order is dispatched the very next 3 - 5 business day, efficient, reliable.`,
    },
    {
      img: "/assets/svgs/customer-service.svg",
      heading: "Dedicated Support",
      content: `Have questions? We're available via WhatsApp and email to assist you quickly.`,
    },
  ];

  return (
    <div className="templateContainer py-4 md:py-8 lg:py-10">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {data.map((item, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`space-y-4 bg-gray-50 rounded px-2.5  py-4 lg:px-4 lg:py-8 `}
            key={index}
          >
            <div className="flex items-center justify-center">
              <Image
                src={item.img || "/assets/svgs/original.svg"}
                alt={item.heading || "Icon"}
                className="h-[50px] w-[50px] lg:h-[80px] lg:w-[80px] object-contain"
                height={80}
                width={80}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-center font-medium text-[10px] lg:text-[14px] tracking-wide lg:tracking-wider text-templateText">
                {item.heading}
              </h3>
              <p className="text-center text-[11px] hidden md:block tracking-wider text-templateDark font-light text-templateText">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconWithText;
