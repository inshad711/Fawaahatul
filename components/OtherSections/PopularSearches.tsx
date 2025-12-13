import React from "react";

const PopularSearches = () => {
  const popularsearches = [
    { label: "Mens perfume", url: "/collection/mens" },
    { label: "Womens perfume", url: "/collection/womens" },
    { label: "Unisex fragrances", url: "/collection/unisex" },
    { label: "Luxury perfumes", url: "/collection/luxury" },
    { label: "Travel size perfumes", url: "/collection/travel-size" },
    { label: "Perfume gift sets", url: "/collection/gift-sets" },
    { label: "Floral scents", url: "/collection/floral" },
    { label: "Woody scents", url: "/collection/woody" },
    { label: "Fresh fragrances", url: "/collection/fresh" },
    { label: "Spicy scents", url: "/collection/spicy" },
    { label: "Long lasting perfumes", url: "/collection/long-lasting" },
    { label: "Best sellers", url: "/collection/best-sellers" },
    { label: "New arrivals", url: "/collection/new-arrivals" },
    { label: "Agarwood / Oud", url: "/collection/oud" },
    { label: "Arabic perfumes", url: "/collection/arabic" },
    { label: "French perfumes", url: "/collection/french" },
    { label: "Daily wear perfumes", url: "/collection/daily-wear" },
    { label: "Date night perfumes", url: "/collection/date-night" },
    { label: "Office perfumes", url: "/collection/office-wear" },
    { label: "Summer perfumes", url: "/collection/summer" },
    { label: "Winter perfumes", url: "/collection/winter" },
    { label: "Roll-on perfumes", url: "/collection/roll-on" },
    { label: "Oil based perfumes", url: "/collection/oil-based" },
    { label: "Body mists", url: "/collection/body-mists" },
    { label: "Deodorants", url: "/collection/deodorants" },
    { label: "Gift under $50", url: "/collection/gifts-under-50" },
    { label: "Luxury under $100", url: "/collection/luxury-under-100" },
    { label: "For teenagers", url: "/collection/teen-fragrances" },
    { label: "Miniatures", url: "/collection/miniatures" },
    { label: "Top rated perfumes", url: "/collection/top-rated" },
  ];

  return (
    <div className="templateContainer space-y-6 py-8 md:py-10 lg:py-12">
      <h2 className="text-2xl text-templateText tracking-wide font-medium">
        Popular Searches
      </h2>
      <div className="flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3">
        {popularsearches.map((search, index) => (
          <span key={index} className="text-[13px] lg:text-sm">
            <a
              href={search.url}
              className="text-gray-500 hover:border-b border-templateText hover:text-templateText duration-200"
            >
              {search.label}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
