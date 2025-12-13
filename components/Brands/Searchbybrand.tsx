"use client";

import { brandService } from "@/services/brandService";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

interface Brand {
  name: string;
  slug: string;
}

type GroupedBrands = Record<string, Brand[]>;

const groupBrandsByAlphabet = (brands: Brand[]): GroupedBrands => {
  return brands.reduce((acc: GroupedBrands, brand) => {
    const char = brand.name[0].toUpperCase();
    if (!acc[char]) acc[char] = [];
    acc[char].push(brand);
    return acc;
  }, {});
};

const Searchbybrand = ({ paramAlphabet }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchBrands = async (query: string) => {
      setLoading(true);
      try {
        const res = await brandService.getBrandsBySearch(query);
        console.log(res);

        setBrands(res.success ? res.data : []);
      } catch (err) {
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchBrands(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const groupedBrands = groupBrandsByAlphabet(brands);

  const scrollToLetter = (letter: string) => {
    const section = sectionRefs.current[letter];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    router.push(`?alphabet=${letter}`, { scroll: false });
    scrollToLetter(letter);
  };

  useEffect(() => {
    const param = paramAlphabet?.toUpperCase();
    if (param && alphabet.includes(param)) {
      setSelectedLetter(param);
      setTimeout(() => scrollToLetter(param), 300);
    }
  }, [paramAlphabet, brands]);

  return (
    <div className="space-y-10">
      <div className="max-w-md mx-auto">
        <Input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setLoading(true);
          }}
          className="h-10"
          placeholder="Search for brand.."
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`border h-8 md:h-9 w-8 md:w-9 flex items-center justify-center rounded-full text-sm uppercase duration-200 ${
              selectedLetter === letter
                ? "bg-templateText text-white scale-125"
                : "text-templateText hover:bg-templateText hover:text-white scale-95 hover:scale-125"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded h-8 w-full"
            />
          ))}
        </div>
      ) : brands.length === 0 ? (
        <div className="text-center text-sm text-gray-500">
          No brands found for <span className="underline">{searchTerm}</span>.
        </div>
      ) : (
        alphabet.map((letter) => {
          const group = groupedBrands[letter];
          if (!group) return null;

          return (
            <div
              key={letter}
              ref={(el: any) => (sectionRefs.current[letter] = el)}
              className="space-y-3 scroll-mt-8"
            >
              <h4 className="px-3 text-lg font-semibold text-templateText uppercase">
                {letter}
              </h4>
              <hr />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-2 gap-y-4">
                {group.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/collections/${brand.slug}`}
                    className="hover:bg-gray-100 py-2 px-3 cursor-pointer rounded-md"
                  >
                    <span className="text-base tracking-wide text-templateText">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Searchbybrand;
