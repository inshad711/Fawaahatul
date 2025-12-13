import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="h-[110svh] lg:h-[100vh] relative overflow-hidden w-full flex items-center justify-center">
      <Image
        src={"/banner.avif"}
        alt="Banner Image"
        sizes="100vw"
        height={1200}
        className="h-full w-full object-cover"
        width={1600}
      />
      <div className="absolute inset-0 p-4 bg-black/50 flex flex-col items-center justify-center">
        <div className="bg-white p-5 md:p-8 rounded-lg flex flex-col items-center justify-center gap-5 lg:gap-6">
          <div className="h-14">
            <Image
              className="h-full w-full object-contain"
              src={"/assets/logos/logowithwhitebg.png"}
              alt={`${process.env.STORE_NAME}` || "Logo"}
              width={200}
              height={50}
            />
          </div>
          <div>
            <h1
              className="text-6xl md:text-[65px] tracking-wide font-extrabold text-transparent bg-clip-text text-center"
              style={{
                backgroundImage:
                  "url('https://media.gucci.com/dynamic/b3c8/hqYTGUDjMWgALwSOVDej38z1nm2U+aJCOi6i_p0+msd8kPlra+PlL0YiB9s6KgrXcOxhZ99DD415z2IievulkuNsecFdcNQHuWzDQZBU1WPZ7dcyBZfQZXMsraqiew3FksVdynfvgUxrWXch2IaEdCs84zrOpLi2AwX7HX90pgeI2uRK62jSWGS2ZvL5p_6NAmNm2VR13EBn3xVAWp_GGIlwjN_7vh55KBKxJGWPNa4IAOfLHlok10dWpd+Etk4FSiJ4AjGkhuaNVwSwCkE8+KMUjL4cM97twbvEK9LWHVieqKk2qEA09CGwcd0ZD90B/HP_CinamaticLandscape_Gucci-Flora-juin24-001_001_Default.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              COMING SOON
            </h1>
            <p className="text-lg mt-2 text-center tracking-wide font-medium text-templateText">
              <span className="text-templateRed ">www.fridaycharm.in</span> is
              Getting Ready to Go Global!
            </p>
            <p className="text-[13px] mt-2 tracking-wide font-medium text-gray-700 md:max-w-[600px] text-center mx-auto">
              We’ve been proudly serving fragrance lovers across India with 100%
              original, branded perfumes — and now, we’re getting ready to share
              the charm with the world.
            </p>
            <p className="text-[13px] mt-2 tracking-wide font-medium text-gray-700 md:max-w-[600px] text-center mx-auto">
              Stay tuned as we prepare to launch our international platform,
              bringing the finest fragrances to perfume enthusiasts globally.
            </p>
          </div>
          <div className="flex flex-wrap items-center text-sm gap-4 text-templateText">
            <p>✨ Premium Brands</p>
            <p>✨ Authentic Scents</p>
            <p>✨ Worldwide Shipping Coming Soon</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[13px] mt-2 tracking-wide font-medium text-gray-700 md:max-w-[600px] text-center mx-auto">
                Follow us and be the first to know when we go live!
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2  md:gap-5 text-sm tracking-wide font-medium text-gray-700">
              <a
                href="mailto:care@fridaycharm.com"
                className="flex items-center gap-1 underline hover:text-templateRed"
              >
                <Mail size={15} strokeWidth={1.5} /> care@fridaycharm.com
              </a>
              <a
                href="tel:+919833556611"
                className="flex items-center gap-1 underline hover:text-templateRed"
              >
                <Phone size={15} strokeWidth={1.5} /> +91 9833556611
              </a>
            </div>
            <div>
              <p className="text-sm text-center">
                {" "}
                <span className="text-templateRed ">www.fridaycharm.in</span> —
                Where Fragrance Meets Passion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
