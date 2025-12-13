"use client";
import { RootState } from "@/store/store";
import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  variation: number;
}

const HeaderAccountComp: React.FC<Props> = ({ variation }) => {
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );

  return (
    <>
      {/* {!storedCustomerData ? (
        <div className="w-6 lg:w-24 h-6 lg:h-8 rounded-full bg-gray-200 animate-pulse"></div>
      ) : (
        <> */}
      {storedCustomerData ? (
        <Link href={"/account"}>
          <div className="flex items-center gap-1 cursor-pointer ">
            <div className="max-h-5 max-w-5 ">
              <UserRound
                color={variation === 1 ? "white" : "black"}
                className={`h-full w-full`}
                strokeWidth={1.5}
              />
            </div>
            <h3
              className={`hidden lg:block text-sm font-light tracking-wide ${variation === 1 ? "text-white" : "text-templateText"
                }`}
            >
              {storedCustomerData?.first_name} {storedCustomerData?.last_name}
            </h3>
          </div>
        </Link>
      ) : (
        <Link href={"/auth/login"}>
          <div className="flex items-center gap-1 cursor-pointer ">
            <div className="max-h-5 max-w-5 ">
              <UserRound
                color={variation === 1 ? "white" : "white"}
                className={`h-full w-full`}
                strokeWidth={1.5}
              />
            </div>
            {/* <h3 className="hidden lg:block text-sm text-white font-light tracking-wide">
              Log In
            </h3> */}
          </div>
        </Link>
      )}
      {/* </>
      )} */}
    </>
  );
};

export default HeaderAccountComp;
