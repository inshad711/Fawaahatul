"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { clearCustomerData } from "@/store/slice/customerDataSlice";
import { Modal } from "antd";
import {
  Book,
  ChevronRight,
  Heart,
  Home,
  Package,
  Power,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProfileSidebar = ({ currentTab }: any) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove(process.env.AUTH_TOKEN!);
    localStorage.removeItem("guestCart");
    dispatch(clearCustomerData());
    toast.success("Successfully Logged out!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const accountData = [
    {
      icon: <User size={16} strokeWidth={1.5} />,
      text: "Profile",
      url: "profile",
    },
    // {
    //   icon: <Book size={16} strokeWidth={1.5} />,
    //   text: "Address",
    //   url: "address",
    // },
    {
      icon: <Package size={16} strokeWidth={1.5} />,
      text: "Orders",
      url: "orders",
    },
    {
      icon: <Heart size={16} strokeWidth={1.5} />,
      text: "Wishlist",
      url: "wishlist",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-[3px] text-xs tracking-wide text-templateText font-medium">
        <Link href="/">
          <Home
            size={14}
            className="mt-0.5 text-templateText"
            strokeWidth={1.5}
          />
        </Link>
        <ChevronRight
          size={14}
          strokeWidth={1.5}
          className="text-templateText mt-0.5"
        />
        <span>account</span>
        {currentTab && (
          <>
            <ChevronRight
              size={14}
              strokeWidth={1.5}
              className="text-templateText mt-0.5"
            />
            <span className="underline">{currentTab}</span>
          </>
        )}
      </nav>

      {/* Sidebar Links */}
      <div className=" grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-1">
        {accountData.map((item) => (
          <Link
            href={`?tab=${item.url}`}
            key={item.url}
            passHref
            className="block"
          >
            <button
              className={`w-full ${
                currentTab === item.url
                  ? "bg-templatePrimary text-templatePrimaryText"
                  : ""
              } lg:text-left flex items-center rounded-sm justify-center lg:justify-start gap-1 text-[0.8rem] text-center tracking-wide border lg:border-none p-3 hover:bg-templatePrimary hover:text-templatePrimaryText transition-all ease-in-out duration-200`}
            >
              {item.icon}
              {item.text}
            </button>
          </Link>
        ))}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className={`w-full bg-gray-200 transition-all ease-in-out duration-200  rounded-sm lg:text-left flex items-center justify-center text-templateText lg:justify-start gap-1  text-[0.8rem] text-center tracking-wide p-3 `}
            >
              <Power size={16} strokeWidth={1.5} />
              Logout
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[350px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to proceed with this action?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        width={350}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="space-y-3 px-2 py-4 pb-6">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">Are you sure?</h3>
            <p>Do you want to proceed with this action?</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleCancel}
              className="bg-templatePrimary w-full py-2 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="border-templatePrimary border text-templatePrimary w-full py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileSidebar;
