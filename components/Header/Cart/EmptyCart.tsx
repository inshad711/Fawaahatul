import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";

const EmptyCart = ({ handleCartToggle }: { handleCartToggle: any }) => {
  return (
    <>
      <div className="p-5">
        <h2 className="text-templateText">Your Cart</h2>
        <Divider />
      </div>
      {/* ---------- */}
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
          <h2 className="text-templateText text-center">Your cart is empty</h2>
          <p className="text-xs text-center text-gray-500 tracking-wide font-medium">
            There is nothing in your bag. Let's add some items.
          </p>
        </div>
        <Link
          onClick={handleCartToggle}
          href={"/collections"}
          className="block text-center"
        >
          <button className="border uppercase border-templatePrimary tracking-wide text-templatePrimary py-2 px-6 text-xs font-medium">
            Let's Shop
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
