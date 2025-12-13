import React from "react";
import { ArrowUpLeft, Search } from "lucide-react";
import SearchProductCard from "../Cards/SearchProductCard";
import Link from "next/link";

interface Props {
  results: any;
  query: string;
  handleClick?: any;
  setSearchValue: any;
}

const AfterSearch: React.FC<Props> = ({
  results,
  query,
  handleClick,
  setSearchValue,
}) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-full lg:min-h-auto h-full w-full overflow-y-auto pb-36 lg:pb-0">
      <div className="w-full lg:max-w-[200px] lg:min-w-[200px] bg-templateBackground p-4">
        <div className="space-y-4">
          <h2 className="text-xs tracking-wide font-semibold text-templateText">
            Related Collections
          </h2>
          <hr />
          <div className=" space-y-2 text-xs text-black font-light">
            {results?.collections?.map((item: any, i: any) => (
              <Link
                href={`/collections/${item.collection_slug}`}
                // onClick={() => handleSuggestionClick(item.title)}
                key={i}
                className="flex cursor-pointer items-center hover:px-[3px] hover:bg-gray-200 transition-all ease rounded-md justify-between"
              >
                <span className="block cursor-pointer  text-templateText px-1 py-1.5 tracking-wide">
                  {item.title}
                </span>
                <ArrowUpLeft size={17} strokeWidth={1} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4 w-full">
        {results?.products ? (
          <>
            <h2 className="text-xs tracking-wide font-semibold text-templateText">
              Search Results for{" "}
              <span className="text-templatePrimary underline text-red-500">
                {query}
              </span>
            </h2>
            {results.products.length <= 0 ? (
              <div className="flex w-full flex-col gap-1 pt-2 items-center mx-auto justify-center">
                <Search size={35} strokeWidth={1.5} className="text-gray-400" />
                <h2 className="text-base tracking-wide font-medium text-templateText">
                  We couldn't find any matches!
                </h2>
                <p className="text-xs text-center text-gray-500 tracking-wide">
                  Please check the spelling or try searching for something else.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  w-full gap-x-2 gap-y-6">
                {results.products.map((item: any, i: any) => (
                  <div key={i}>
                    <SearchProductCard item={item} handleClick={handleClick} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full flex-col gap-1 py-10 items-center mx-auto min-h-full justify-center">
            <Search size={35} strokeWidth={1.5} className="text-gray-400" />
            <h2 className="text-sm tracking-wide font-medium text-templateText">
              Search for product
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterSearch;
