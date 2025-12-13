import React from "react";

const StripePayment = () => {
  return (
    <div className="space-y-6 text-templateText">
      <h2 className="text-[20px] lg:text-[22px] font-medium">Payment Method</h2>
      <div>
        <button className="flex items-center justify-center gap-0 bg-gradient-to-r from-[#9966FF] via-[#4254EF] to-[#14EAE2] w-full py-3 rounded-md font-semibold">
          Pay Using
          <img
            src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2020/05/Stripe-logo-white_lg.png"
            alt=""
            className="h-7"
          />
        </button>
      </div>
    </div>
  );
};

export default StripePayment;
