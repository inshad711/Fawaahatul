"use client";
import { Search, X } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";
import AfterSearch from "./AfterSearch";
import { usePathname } from "next/navigation";
import Loader from "../Loader/Loader";
import BeforeSearch from "./BeforeSearch";
import { searchService } from "@/services/searchService";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  variation: number;
}

const SearchBarComp: React.FC<Props> = ({ variation }) => {
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const path = usePathname();
  const [placeholder, setPlaceholder] = useState("");

  const placeholders = ["Oud Nadir", "Dakhoon Al Hind", "Dakhoon Azraq"];
  useEffect(() => {
    let i = 0;
    let j = 0;
    let currentText = "";
    let isDeleting = false;

    const typeEffect = () => {
      if (!isDeleting && j < placeholders[i].length) {
        currentText = placeholders[i].substring(0, j + 1);
        j++;
      } else if (isDeleting && j > 0) {
        currentText = placeholders[i].substring(0, j - 1);
        j--;
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % placeholders.length;
      }
      setPlaceholder(currentText);
      setTimeout(typeEffect, isDeleting ? 100 : 150);
    };

    typeEffect();
  }, []);

  // 🔹 API Call with Proper Loading Handling
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const customerId = storedCustomerData?.customer_id;

    try {
      const response = await searchService.getSearchResults(query, customerId);
      if (response.success) {
        setSearchResults(response.data);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Input with Debouncing
  const handleInputChange = () => {
    setLoading(true);
    setIsActive(searchValue.trim().length > 0);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(searchValue);
    }, 500);
  };

  useEffect(() => {
    searchValue && handleInputChange();
  }, [searchValue]);

  // 🔹 Close search box on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Close search box on route change
  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <div className="hidden lg:block">
      <div
        ref={searchBoxRef}
        className={`relative flex items-center border-b border-templateText/50 gap-2 px-2 pb-2`}
      >
        <Search
          size={15}
          strokeWidth={2}
          className={`text-templateText ${variation === 1 ? "text-white" : "text-templateText"
            }`}
        />
        <input
          onClick={() => setIsActive(true)}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={`${variation === 1
            ? "placeholder:text-white text-white"
            : "placeholder:text-templateText text-templateText"
            } text-[11px] mt-[3px] min-w-44  bg-transparent focus:outline-none templateText tracking-wide`}
          placeholder={`Search for ${placeholder}`}
        />
        <X
          onClick={() => {
            setSearchValue("");
            setIsActive(false);
          }}
          size={18}
          strokeWidth={2}
          className={`text-white cursor-pointer ${searchValue ? "block" : "hidden"
            }`}
        />
        <div
          className={`absolute left-0 z-50 top-[120%] min-w-[90vw] min-h-40 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-background transition-all duration-300 transform ${isActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              {searchValue ? (
                <AfterSearch
                  results={searchResults}
                  setSearchValue={setSearchValue}
                  query={searchValue}
                />
              ) : (
                <>
                  {isActive && <BeforeSearch setSearchValue={setSearchValue} />}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBarComp;
