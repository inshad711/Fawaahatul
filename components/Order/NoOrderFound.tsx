import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoOrderFound = () => {
  return (
    <div className="w-full h-full p-5 space-y-4">
      <div className="flex items-center justify-center">
        <Image
          src={"/assets/placeholders/emptycart.webp"}
          alt="empty cart"
          height={150}
          width={150}
        />
      </div>
      <div className="space-y-0.5">
        <h2 className="text-templateText text-center">
          You haven't placed any order yet!
        </h2>
        <p className="text-xs text-center text-gray-500 tracking-wide font-medium">
          Order section is empty. After placing order, You can track them from
          here!
        </p>
      </div>
      <Link href={"/"} className="block text-center">
        <button className="border uppercase border-templateText tracking-wide text-templateText py-2 px-6 text-sm font-medium">
          Continue shopping
        </button>
      </Link>
    </div>
  );
};

export default NoOrderFound;
