"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const NotificationPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000); // show after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-[600px] bg-white shadow-2xl overflow-hidden animate-popupfadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/70 text-white hover:bg-black transition p-2"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Image section */}
        <div className="relative w-full h-full">
          <Image
            src="/popup.webp" // replace with your image path
            alt="Special Notification"
            height={1000}
            sizes="100vw"
            width={1000}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
