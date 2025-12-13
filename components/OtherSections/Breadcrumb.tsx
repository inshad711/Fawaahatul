import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  heading: string;
  breadCrumb: any[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ heading, breadCrumb }) => {
  return (
    <div className="overflow-hidden border-t border-white/10 relative">
      <div className="absolute inset-0 bg-white"></div>
      <div className="text-center Container py-10 relative md:py-8 lg:py-20 text-templateText space-y-2">
        <h1 className="text-2xl lg:text-3xl tracking-wide text-templatePrimary font-semibold uppercase">
          {heading}
        </h1>
        <ul className="flex flex-wrap text-sm items-center gap-1.5 justify-center text-templateText">
          {breadCrumb.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-1.5 font- tracking-wide capitalize ${
                index === breadCrumb.length - 1
                  ? "text-templatePrimary font-"
                  : ""
              }`}
            >
              {index === 0 ? (
                <Link href="/" className="hover:text-templatePrimary">
                  {item}
                </Link>
              ) : (
                <span>{item}</span>
              )}
              {index < breadCrumb.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide mb-0.5 lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
