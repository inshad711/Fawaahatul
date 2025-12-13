"use client";
import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslate = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // @ts-ignore
      window.googleTranslateElementInit = () => {
        // @ts-ignore
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslate();
  }, []);

  return (
    <div
      id="google_translate_element"
      className=" h-[34px]  overflow-hidden z-[1000] text-sm [&_select]:rounded-md [&_select]:border [&_select]:border-gray-300 [&_select]:px-2 [&_select]:py-1 [&_select]:text-black"
    />
  );
};

export default GoogleTranslate;
