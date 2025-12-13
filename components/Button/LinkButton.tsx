import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  link: string;
  className?: string; // Ensure className is optional
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  link,
  className = "",
}) => {
  return (
    <button className="relative overflow-hidden">
      <Link
        href={link}
        className={`px-6 py-2 text-sm tracking-wide bg-white border border-templatePrimary text-templateText flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out shadow-md hover:scale-100 
        before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-templatePrimary before:to-templatePrimary before:transition-all before:duration-500 before:ease-in-out before:z-[-1] 
        hover:text-templatePrimaryText hover:before:left-0 ${className}`}
      >
        {text}
      </Link>
    </button>
  );
};

export default LinkButton;
