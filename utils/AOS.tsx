"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

const AOS = () => {
  const pathname = usePathname();
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 500,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (!pathname.includes("/collections")) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
};

export default AOS;
