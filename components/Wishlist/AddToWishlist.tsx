"use client";
import { Heart, Loader } from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  itemId: number;
  isInWishlist: boolean;
  detailPage?: boolean;
}

const AddToWishlist: React.FC<Props> = ({ isInWishlist, itemId }) => {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const customerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );

  const handleClick = async () => {
    if (!token || !customerData) {
      toast.info(({ closeToast }) => (
        <div className="flex  items-center justify-between w-full pr-4 gap-1">
          <p className="text-xs tracking-wide">
            Please login to add to wishlist!
          </p>
          <Button
            variant={"outline"}
            onClick={() => {
              closeToast();
              router.push("/auth/login");
            }}
            className="text-sm !px-3 h-8 "
          >
            Login
          </Button>
        </div>
      ));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/wishlist/manage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Authorization-Customer": `Bearer ${token}`,
          },
          body: JSON.stringify({
            item_id: itemId,
            variation_name: null,
            action: isWishlisted ? "remove" : "add",
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setIsWishlisted((prev) => !prev);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Internal error: ", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        if (!loading) handleClick();
      }}
      className={clsx(
        "bg-white flex items-center rounded-full border px-2 py-2 text-[11px] font-normal tracking-wide group cursor-pointer transition-all ease-in-out duration-500"
        // {
        //   "border-[#FF3E59] bg-[#faeaec]": isWishlisted,
        // }
      )}
    >
      <span
        className={`opacity-0 max-w-0 ${
          isWishlisted ? "text-[#FF3E59]" : "text-templateText"
        } font-semibold tracking-wide group-hover:mx-2 group-hover:opacity-100 group-hover:max-w-[300px] transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap`}
      >
        {isWishlisted ? "Wishlisted" : "Add To Wishlist"}
      </span>
      {loading ? (
        <Loader
          size={16}
          className="animate-spin h-[21px] w-[21px] text-[#FF3E59]"
        />
      ) : (
        <Heart
          size={15}
          className={`${
            isWishlisted ? "text-[#FF3E59] fill-[#FF3E59]" : "text-[#242424]"
          }`}
        />
        // <img
        //   src={`/assets/${isWishlisted ? "wishlist (1)" : "wishlist"}.png`}
        //   className={clsx(
        //     "group-hover:mr-1 transition-all duration-500 ease-in-out",
        //     {
        //       "h-[20px] w-[20px]": isWishlisted,
        //       "h-[22px] w-[22px]": !isWishlisted,
        //     }
        //   )}
        //   alt="Wishlist Icon"
        // />
      )}
    </div>
  );
};

export default AddToWishlist;
