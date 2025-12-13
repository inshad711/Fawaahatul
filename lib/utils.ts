import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUSD = (amount: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Utility function to format numbers
export const formatCount = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};

export const generateCartPayload = (guestCartData: any[]) => {
  return guestCartData.map((item) => {
    const { id, isVariantProduct, variants, name } = item;

    return {
      item_id: id,
      productName: name,
      variation: isVariantProduct ? variants : null,
      quantity: item.quantity,
    };
  });
};
