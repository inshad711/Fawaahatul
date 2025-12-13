import React, { useEffect, useState } from "react";
import { ChartNoAxesCombined, Flame, TrendingUp } from "lucide-react";
import SearchProductCard from "../Cards/SearchProductCard";
import { searchService } from "@/services/searchService";
import Loader from "../Loader/Loader";

const BeforeSearch = ({ setSearchValue }: { setSearchValue: any }) => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const defaultTrending = ["Hotwheels", "Burago", "Majorette"];

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await searchService.getBeforeSearchResults();
      if (response.success) {
        setResults(response.data);
      } else {
        setResults(null);
      }
    } catch (error) {
      console.log(error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // if (!loading && !results) {
  //   return (
  //     <div className="flex items-center justify-center py-20">
  //       Search for something...
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-5 min-h-full !z-50 lg:min-h-auto h-full w-full overflow-y-auto px-4 pt-6 pb-36 lg:pb-6">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined size={17} className="text-templateText" />
          <h2 className="text-xs tracking-wide font-medium text-templateText">
            Trending Searches
          </h2>
        </div>
        <div className="flex items-center flex-wrap gap-2 text-xs text-black font-light">
          {results?.trending?.length > 0
            ? results?.trending?.map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSearchValue(item?.query)}
                  className="bg-white flex items-center gap-1 border px-3 tracking-wide py-1.5"
                >
                  {item?.query}{" "}
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-templateText" />
                    {item?.total_searches}
                  </span>
                </button>
              ))
            : defaultTrending?.map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSearchValue(item)}
                  className="bg-white flex items-center gap-1 border px-3 tracking-wide py-1.5"
                >
                  {item}
                </button>
              ))}
        </div>
      </div>
      {results?.recommended?.length > 0 ? (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Flame size={17} className="text-templateText" />
            <h2 className="text-xs tracking-wide font-medium text-templateText">
              Recommended For You
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {results?.recommended?.map((item: any, i: number) => (
              <div key={i}>
                <SearchProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BeforeSearch;
