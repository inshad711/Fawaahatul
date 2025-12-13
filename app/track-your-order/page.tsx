import PopularSearches from "@/components/OtherSections/PopularSearches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Trackyourorder = () => {
  return (
    <>
      <div className="templateContainer py-20">
        <h2 className="text-2xl text-templateText tracking-wide text-center font-medium">
          Track your order
        </h2>
        <p className="text-gray-500 text-center mt-2 text-[13px]  tracking-wide">
          enter your order details below to get the latest status
        </p>
        <form className="flex justify-center mt-4">
          <div className="w-[350px] space-y-4">
            <Input
              type="email"
              placeholder="Enter your order / tracking number"
            />
            <Button className="w-full">
              {/* <LoaderIcon /> */}
              Track your order
            </Button>
          </div>
        </form>
      </div>
      <PopularSearches />
    </>
  );
};

export default Trackyourorder;
