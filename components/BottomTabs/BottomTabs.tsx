"use client";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileNavigation from "../Header/Navigation/MobileNavigation";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import CartDrawer from "../Header/Cart/CartDrawer";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { toggleCartDrawer } from "@/store/slice/CartToggle";
import Cookies from "js-cookie";
import { getTargetTriple } from "next/dist/build/swc/generated-native";
import { RiMenu4Fill } from "react-icons/ri";
import { setOpenMenu, toggleOpenMenu } from "@/store/slice/togglesSlice";

const BottomTabs = ({ headerMenu }: { headerMenu: any }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const [totalInCart, setTotalInCart] = useState<number | null>();
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const dispatch = useDispatch();
  const path = usePathname();

  const handleCartOpen = () => {
    dispatch(toggleCartDrawer());
  };

  const getTotalCartNumber = () => {
    const cartItem = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const noOfQuantityInCart = cartItem.reduce((total: any, item: any) => {
      return total + item.quantity;
    }, 0);
    setTotalInCart(noOfQuantityInCart);
  };

  useEffect(() => {
    !token && getTotalCartNumber();
  }, []);

  if (path.includes("/products/") || path.includes("/checkout")) return null;

  return (
    <div className="lg:hidden h-[65px] border-t grid grid-cols-5 fixed w-full bottom-0  left-0 my-auto bg-templateBackground text-templateText">
      <Link
        href={"/"}
        className="grid gap-1 active:bg-gray-200 place-content-center place-items-center"
      >
        <AiOutlineHome size={20} />
        <span className="text-xs leading-none tracking-wider">Home</span>
      </Link>
      <div className="active:bg-gray-100 grid gap-1 place-content-center place-items-center">
        <div
          onClick={() => dispatch(setOpenMenu(true))}
          className={`lg:hidden grid gap-1 place-content-center place-items-center`}
        >
          <RiMenu4Fill size={20} color="#242424" />
          <span className="text-xs leading-none tracking-wider">Menu</span>
        </div>
      </div>
      <Link
        href={"/collections/all-products"}
        className=" grid gap-1 active:bg-gray-200 place-content-center place-items-center"
      >
        <MdOutlineDashboard size={20} />
        <span className="text-xs leading-none tracking-wider">Shop</span>
      </Link>
      <div
        onClick={handleCartOpen}
        className="active:bg-gray-100 relative grid gap-1 place-content-center place-items-center"
      >
        {totalInCart && totalInCart > 0 ? (
          <span
            className="bg-templateText text-white text-[11px] leading-none rounded-full 
        h-5 w-5 flex items-center justify-center absolute top-1.5 right-5"
          >
            {totalInCart}
          </span>
        ) : null}
        <ShoppingBag size={20} />
        <span className="text-xs leading-none tracking-wider">Cart</span>
      </div>
      <Link
        href={`${storedCustomerData ? "/account" : "/auth/login"}`}
        className="grid gap-1 active:bg-gray-200 place-content-center place-items-center"
      >
        <MdOutlineAccountCircle size={20} />
        <span className="text-xs leading-none tracking-wider">Account</span>
      </Link>
    </div>
  );
};

export default BottomTabs;
