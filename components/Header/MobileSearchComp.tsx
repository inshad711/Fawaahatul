"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import BeforeSearch from "./BeforeSearch";
import AfterSearch from "./AfterSearch";
import Loader from "../Loader/Loader";

const placeholders = ["Hotwheels", "Burago", "Majorette"];

const MobileSearchComp = ({ variation }: { variation: number }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Placeholder Typing Effect
  useEffect(() => {
    let i = 0,
      j = 0,
      currentText = "",
      isDeleting = false;

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

  // 🔹 Prevent body scroll when search is active
  useEffect(() => {
    document.body.classList.toggle("no-scroll", showMobileSearch);
    return () => document.body.classList.remove("no-scroll");
  }, [showMobileSearch]);

  // 🔹 API Call Logic
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/getSearchProductKeywords?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Debounce Logic on Input Change
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults(null);
      setLoading(false);
      return;
    }

    setLoading(true); // <-- immediately show loader when user types.

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(searchValue);
    }, 1000);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchValue, fetchSearchResults]);

  return (
    <>
      <div className="templateContainer">
        <div
          onClick={() => setShowMobileSearch(true)}
          className="relative flex items-center z-0 border-b border-templateText/20 py-2 gap-4 px-0.5"
        >
          <Search
            size={18}
            strokeWidth={2}
            color={variation === 1 ? "#fff" : "#000"}
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`text-xs min-w-44 ${
              variation === 1
                ? "placeholder:text-white"
                : "placeholder:text-gray-600"
            } bg-transparent focus:outline-none  tracking-wide`}
            placeholder={`Search for ${placeholder}`}
          />
        </div>
      </div>

      {showMobileSearch && (
        <div className="fixed top-0 left-0 z-50 h-screen w-full bg-background">
          <div className="flex items-center gap-5 bg-templateBackground p-4">
            <ArrowLeft
              onClick={() => setShowMobileSearch(false)}
              size={24}
              className="text-templateText cursor-pointer"
              strokeWidth={2}
            />
            <div className="flex items-center gap-2 border w-full p-2">
              <Search
                size={20}
                strokeWidth={1.5}
                className="text-templateText"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="text-xs w-full bg-templateBackground text-templateText focus:outline-none placeholder:text-gray-800"
                placeholder={`Search for ${placeholder}`}
              />
              <X
                onClick={() => setSearchValue("")}
                size={18}
                strokeWidth={2}
                className={`text-templateText cursor-pointer ${
                  searchValue ? "block" : "hidden"
                }`}
              />
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-500"></div>

          {loading ? (
            <div className="flex flex-col gap-1 py-12 items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchValue ? (
                <AfterSearch
                  results={searchResults}
                  query={searchValue}
                  handleClick={() => setShowMobileSearch(false)}
                  setSearchValue={setSearchValue}
                />
              ) : (
                <>
                  {showMobileSearch && (
                    <BeforeSearch setSearchValue={setSearchValue} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileSearchComp;
