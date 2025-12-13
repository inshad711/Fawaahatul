import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = ({ text }: { text?: string }) => {
  return (
    <div className="templateContainer space-y-2 py-20 text-center text-white">
      <h2 className="text-9xl gradientHeading  block leading-none font-semibold tracking-wider ">
        404
      </h2>
      <h3 className="text-xl text-templateText block leading-none font-semibold tracking-wider ">
        {text || "Not Found"}
      </h3>
      <Link className="block" href="/">
        <h4 className="text-templateText underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Return to homepage
        </h4>
      </Link>
    </div>
  );
};

export default NotFound;
