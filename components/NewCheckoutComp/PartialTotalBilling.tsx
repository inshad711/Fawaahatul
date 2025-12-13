import { useFormatAmount } from "@/hooks/useFormatAmount";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const PartialTotalBilling = ({
  prepaidTotal,
  codTotal,
}: {
  prepaidTotal: number;
  codTotal: number;
}) => {
  const { formatAmount } = useFormatAmount();
  return (
    <div className="grid grid-cols-2">
      {prepaidTotal > 0 && (
        <div className="font-semibold text-center">
          Prepaid Total :{" "}
          <span className="text-lg text-green-600">
            {formatAmount(prepaidTotal)}
          </span>
        </div>
      )}
      {codTotal > 0 && (
        <div className="font-semibold text-center">
          COD Total :{" "}
          <span className="text-lg text-green-600">
            {formatAmount(codTotal)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PartialTotalBilling;
