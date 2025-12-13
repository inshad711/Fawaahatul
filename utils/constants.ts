export const calculateDiscount = (
  regularPrice: number,
  sellingPrice: number
): number => {
  if (regularPrice <= 0 || sellingPrice <= 0 || regularPrice <= sellingPrice) {
    return 0;
  }
  return Math.round(((regularPrice - sellingPrice) / regularPrice) * 100);
};

export const filterItems = [
  {
    label: "Brand",
    key: "brand",
    list: [
      { label: "Afnan", value: "afnan", count: 102 },
      { label: "Ajmal", value: "ajmal", count: 82 },
      { label: "Al Rehab", value: "al-rehab", count: 150 },
      { label: "Aramis", value: "aramis", count: 120 },
      { label: "Armaf", value: "armaf", count: 10 },
      { label: "Azzaro", value: "azzaro", count: 1 },
      { label: "Creed", value: "creed", count: 19 },
      { label: "Afnan", value: "afnand", count: 102 },
      { label: "Ajmal", value: "ajmadl", count: 82 },
      { label: "Al Rehab", value: "al-drehab", count: 150 },
      { label: "Aramis", value: "aramdis", count: 120 },
      { label: "Armaf", value: "armdaf", count: 10 },
      { label: "Azzaro", value: "azzdaro", count: 1 },
      { label: "Creed", value: "creedd", count: 19 },
    ],
  },
  {
    label: "Category",
    key: "category",
    list: [
      { label: "Designer Perfumes", value: "designer-perfumes", count: 162 },
      { label: "Niche Perfumes", value: "niche-perfumes", count: 0 },
      { label: "Gift Sets", value: "gift-sets", count: 0 },
      {
        label: "Miniature Travel Set",
        value: "miniature-travel-set",
        count: 55,
      },
    ],
  },
  {
    label: "Availability",
    key: "availability",
    list: [
      { label: "In Stock", value: "in-stock", count: 1062 },
      { label: "Out of Stock", value: "out-of-stock", count: 124 },
    ],
  },
  {
    label: "Price",
    key: "price",
    min: 0,
    max: 10000,
    list: [],
  },
  {
    label: "Gender",
    key: "gender",
    list: [
      { label: "Men", value: "men", count: 1062 },
      { label: "Women", value: "women", count: 124 },
      { label: "Unisex", value: "unisex", count: 124 },
    ],
  },
  {
    label: "Concentration Type",
    key: "concentrationType",
    list: [
      { label: "Eau de Toilette", value: "eau-de-toilette", count: 162 },
      { label: "Eau de Parfum", value: "eau-de-parfum", count: 124 },
    ],
  },
  {
    label: "Fragrance Family",
    key: "fragranceFamily",
    list: [
      { label: "Aromatic", value: "aromatic", count: 162 },
      { label: "Fruity", value: "fruity", count: 124 },
      { label: "Leather", value: "leather", count: 124 },
      { label: "Woody", value: "woody", count: 124 },
      { label: "Warm & Spicy", value: "warm-and-spicy", count: 124 },
    ],
  },
];

export const sortByList = [
  // {
  //   label: "Featured",
  //   value: "featured",
  // },
  {
    label: "Best Selling",
    value: "best_selling",
  },
  {
    label: "Price, low to high",
    value: "price_low_to_high",
  },
  {
    label: "Price, high to low",
    value: "price_high_to_low",
  },
  {
    label: "Alphabetically, A - Z",
    value: "alphabetically_a_to_z",
  },
  {
    label: "Alphabetically, Z - A",
    value: "alphabetically_z_to_a",
  },
  // {
  //   label: "Date: New to Old",
  //   value: "date_new_to_old",
  // },
  // {
  //   label: "Date: Old to New",
  //   value: "date_old_to_new",
  // },
];

export async function detectLocation() {
  return {
    countryName: "India",
    countryCode: "IN",
    countryCallingCode: "+91",
    currency: "INR",
  };
  // try {
  //   const res = await fetch("https://ipapi.co/json/");
  //   const data = await res.json();

  //   return {
  //     countryName: data.country_name || "India",
  //     countryCode: data.country || "IN",
  //     countryCallingCode: data.country_calling_code || "+91",
  //     currency: data.currency || "INR",
  //   };
  // } catch (error) {
  //   return {
  //     countryName: "India",
  //     countryCode: "IN",
  //     countryCallingCode: "+91",
  //     currency: "INR",
  //   };
  // }
}

export const calculateInternationalShipping = (
  totalItems: number,
  globalSetting: any
): number => {
  const usdRate = globalSetting?.exchangeRate?.usd;

  if (!usdRate || totalItems <= 0) return 0;

  const firstItemChargeUSD = 30;
  const additionalItemChargeUSD = 15;

  const totalUSD =
    firstItemChargeUSD + (totalItems - 1) * additionalItemChargeUSD;

  const usdToInr = 1 / usdRate;
  const totalINR = totalUSD * usdToInr;

  return Math.round(totalINR * 100) / 100; // rounded INR
};
