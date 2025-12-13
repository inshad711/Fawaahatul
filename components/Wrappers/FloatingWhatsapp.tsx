"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const FloatingWhatsapp = () => {
  const phoneNumber = "919004456480";
  const message = encodeURIComponent("Hello! Hutz Diecast");
  const pathname = usePathname();

  if (pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-20 lg:bottom-5 space-y-2 left-5">
      <a
        href={`https://www.instagram.com/hutzdiecast`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 hover:-translate-y-1 transition-all ease-in-out duration-300 flex items-center gap-0.5 rounded-xl    z-[1]"
      >
        <Image
          src={"/instagram.webp"}
          alt="WhatsApp"
          height={100}
          width={100}
          className="h-10 w-10 object-contain"
        />
      </a>
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 hover:-translate-y-1 transition-all ease-in-out duration-300 flex items-center gap-0.5    z-[1]"
      >
        <Image
          src={"/whatsapp.webp"}
          alt="WhatsApp"
          height={100}
          width={100}
          className="h-10 rounded-lg w-10 object-contain"
        />
      </a>
    </div>
  );
};

export default FloatingWhatsapp;
