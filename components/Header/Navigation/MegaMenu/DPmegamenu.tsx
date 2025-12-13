import ImageWithFallback from "@/components/Image/Fallbackimage";
import React from "react";

const DPmegamenu = () => {
  return (
    <div className="py-6 templateContainer grid grid-cols-5 gap-4">
      <div>
        <div className="space-y-2">
          <ImageWithFallback
            className="h-full w-full object-contain"
            src={"/asssets/logos/fridaycharm.png"}
            alt={`${process.env.STORE_NAME}`}
            sizes={"100vw"}
            height={500}
            width={500}
          />
          <h2 className="text-base text-center tracking-wider">MINIATURE</h2>
        </div>
        <div className="space-y-2">
          <ImageWithFallback
            className="h-full w-full object-contain"
            src={"/asssets/logos/fridaycharm.png"}
            alt={`${process.env.STORE_NAME}` || "Logo"}
            sizes={"100vw"}
            height={500}
            width={500}
          />
          <h2 className="text-base text-center tracking-wider">
            PERFUME GIFT SETS
          </h2>
        </div>
        <div className="space-y-2">
          <ImageWithFallback
            className="h-full w-full object-contain"
            src={"/asssets/logos/fridaycharm.png"}
            alt={`${process.env.STORE_NAME}` || "Logo"}
            sizes={"100vw"}
            height={500}
            width={500}
          />
          <h2 className="text-base text-center tracking-wider">
            TOP SELLING BRANDS
          </h2>
        </div>
      </div>
      <div>GRID</div>
      <div>GRID</div>
      <div>GRID</div>
      <div>GRID</div>
    </div>
  );
};

export default DPmegamenu;
