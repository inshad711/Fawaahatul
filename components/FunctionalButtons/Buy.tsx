import React from "react";

interface Props {
  disabled: boolean;
}

const Buy: React.FC<Props> = ({ disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center bg-templateText border-templateText py-3 text-white justify-center w-full gap-2 border  hover:opacity-90  text-sm tracking-wide  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } font-medium disabled:opacity-50 `}
    >
      <span>Buy Now</span>
    </button>
  );
};

export default Buy;
