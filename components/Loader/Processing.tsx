import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const Processing = ({ processing }: { processing: boolean }) => {
  return (
    <div className="flex items-center justify-center py-8">
      {processing ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <svg className="svgClass animate-spin" viewBox="25 25 50 50">
            <circle className="circleClass" r="20" cy="50" cx="50"></circle>
          </svg>
          <h3 className="text-sm tracking-wider font-medium text-green-700">
            Processing your payment
          </h3>
          <p className="text-xs text-center max-w-xs tracking-wide leading-snug text-gray-600">
            Please wait while we prepare your payment. This usually takes a few
            seconds.
          </p>
        </div>
      ) : (
        <div className="">
          <DotLottieReact
            className=""
            autoplay
            loop
            src="/assets/lottie/orderConfirm.json"
          />
          <h3 className="text-lg text-center tracking-wider font-medium text-green-700">
            Order Placed Successfully
          </h3>
          <p className="text-xs mt-2 text-center max-w-xs tracking-wide leading-snug text-gray-600">
            Please wait while we prepare your payment. This usually takes a few
            seconds.
          </p>
        </div>
      )}
    </div>
  );
};

export default Processing;
