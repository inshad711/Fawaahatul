import React from "react";

const Breadcrumb = () => {
  const breadCrumb = [
    "Home",
    "Mens",
    "Luxury Perfume",
    "Tiger Man Perfume - 100ml",
  ];

  return (
    <ul className="hidden lg:flex flex-wrap items-center justify-start gap-1 capitalize tracking-wide text-xs text-templateText font-light">
      {breadCrumb.map((item, index) => (
        <li key={index} className="flex items-center">
          {/* Apply 'text-red-500' class only to the last breadcrumb item */}
          <span
            className={`${
              index === breadCrumb.length - 1 ? "font-semibold underline" : ""
            }`}
          >
            {item}
          </span>
          {/* Render chevron for all but the last item */}
          {index < breadCrumb.length - 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right mx-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
