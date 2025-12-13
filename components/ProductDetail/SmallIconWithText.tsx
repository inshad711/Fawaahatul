import Image from "next/image";
import React from "react";

const SmallIconWithText = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-gray-100 rounded place-content-center place-items-center grid text-center gap-1 p-2">
        <Image
          src={"/assets/svgs/original.svg"}
          alt={"item.heading"}
          className="h-[35px] lg:h-[45px] w-[35px] lg:w-[45px] object-contain"
          height={80}
          width={80}
        />
        <p className="text-[0.7rem] lg:text-[0.8rem] tracking-wider text-templateText leading-[1.2]">
          100% Authentic
        </p>
      </div>
      <div className="bg-gray-100 rounded place-content-center place-items-center grid text-center p-2 gap-1">
        <Image
          src={"/assets/svgs/delivery-man.svg"}
          alt={"item.heading"}
          className="h-[35px] lg:h-[45px] w-[35px] lg:w-[45px] object-contain"
          height={80}
          width={80}
        />
        <p className="text-[0.7rem] lg:text-[0.8rem] tracking-wider text-templateText leading-[1.2]">
          Fast & Free Delivery
        </p>
      </div>
      <div className="bg-gray-100 rounded place-content-center place-items-center grid text-center p-2 gap-1">
        <Image
          src={"/assets/svgs/return.svg"}
          alt={"item.heading"}
          className="h-[35px] lg:h-[45px] w-[35px] lg:w-[45px] object-contain"
          height={80}
          width={80}
        />
        <p className="text-[0.7rem] lg:text-[0.8rem] tracking-wider text-templateText leading-[1.2]">
          Returns & Exchange
        </p>
      </div>
      <div className="bg-gray-100 rounded place-content-center place-items-center grid text-center p-2 gap-1">
        <Image
          src={"/assets/svgs/express.svg"}
          alt={"item.heading"}
          className="h-[35px] lg:h-[45px] w-[35px] lg:w-[45px] object-contain"
          height={80}
          width={80}
        />
        <p className="text-[0.7rem] lg:text-[0.8rem] tracking-wider text-templateText leading-[1.2]">
          Express Delivery
        </p>
      </div>
    </div>
  );
};

export default SmallIconWithText;
