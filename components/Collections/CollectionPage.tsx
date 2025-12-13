"use client";
import React, { useState, useEffect, useRef } from "react";
import FilterHeader from "./FilterHeader";
import { useParams, useSearchParams } from "next/navigation";
import { collectionService } from "@/services/collectionService";
import NotFound from "@/app/not-found";
import CollectionPageSkeleton from "../Skeletons/CollectionPageSkeleton";
import MainProductCard from "../Cards/MainProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SelectedFilters from "./SelectedFilters";
import DesktopSort from "../Filter/DesktopSort";
import DesktopFilter from "../Filter/DesktopFilter";
import MobileFilter from "./MobileFilter";
import MobileSortby from "./MobileSortby";
import { ChevronRight, Loader } from "lucide-react";
import Link from "next/link";

const CollectionPage = () => {
  const params = useParams();
  const pathname = params.collection_name;
  const searchParams = useSearchParams();
  const [collection_name, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterItems, setFilterItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { customerData } = useSelector(
    (state: RootState) => state.customerData
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Parse URL search params
  const parseParams = () => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    return Object.keys(paramsObj).reduce((acc, key) => {
      if (key === "price") {
        acc[key] = paramsObj[key]
          .split(",")
          .filter(Boolean)
          .flatMap((range) => range.split("-").map((num) => Number(num)));
      } else {
        acc[key] = paramsObj[key].split(",").filter(Boolean);
      }
      return acc;
    }, {} as Record<string, string[] | number[]>);
  };

  // Fetch initial page (page 1)
  const fetchInitialCollection = async () => {
    setLoading(true);
    const parsedParams = parseParams();
    const { sort, ...filterWithoutSort } = parsedParams;

    try {
      const response = await collectionService.getCollectionWithFilterAndSort(
        pathname,
        filterWithoutSort,
        sort && sort[0],
        customerData?.customer_id,
        1
      );
      if (response.status) {
        setCollectionName(response.collection_name || "");
        setFilterItems(response.filterItems);
        setProducts(response.products);
        setTotalProducts(response.total);
        setCurrentPage(1);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch next page
  const fetchMoreProducts = async (nextPage: number) => {
    setIsFetchingMore(true);
    const parsedParams = parseParams();
    const { sort, ...filterWithoutSort } = parsedParams;

    try {
      const response = await collectionService.getCollectionWithFilterAndSort(
        pathname,
        filterWithoutSort,
        sort && sort[0],
        customerData?.customer_id,
        nextPage
      );
      if (response.status && response.products.length > 0) {
        setProducts((prev) => [...prev, ...response.products]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Initial fetch when search params change
  useEffect(() => {
    fetchInitialCollection();
  }, [searchParams]);

  // Intersection observer to handle infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingMore &&
          products.length < totalProducts
        ) {
          fetchMoreProducts(currentPage + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [products, totalProducts, isFetchingMore, currentPage, searchParams]);

  // === RENDER ===
  // if (loading) {
  //   return <CollectionPageSkeleton />;
  // }

  if (notFound) {
    return <NotFound text="No Collection found" />;
  }

  return (
    <div className="templateContainer space-y-8 lg:space-y-14 py-8 md:py-8 lg:py-12">
      <div className="space-y-2 lg:space-y-3 templateContainer ">
        <ul className="flex items-center justify-center gap-1 lg:gap-1.5 text-xs lg:text-sm tracking-wide">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <ChevronRight size={16} strokeWidth={1.5} />
          </li>
          <li className="">
            <Link href={"/collections"}>Collections</Link>
          </li>
          <li>
            <ChevronRight size={16} strokeWidth={1.5} />
          </li>
          <li className="underline text-gray-500 underline-offset-4">
            {collection_name || pathname?.toString().replace(/-/g, " ")}
          </li>
        </ul>
        <h1 className="text-2xl capitalize lg:text-[1.75rem] text-center !leading-[1.1] font-medium tracking-wide text-templateText">
          {collection_name || pathname?.toString().replace(/-/g, " ")}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row w-full items-start gap-4 md:gap-10">
        <div className="lg:w-[20%] w-full">
          <div className="hidden lg:block">
            <DesktopFilter filterItems={filterItems} />
          </div>
          <div className="lg:hidden">
            <div className="flex w-full items-center justify-between">
              <MobileFilter filterItems={filterItems} />
              <MobileSortby />
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-2 w-full">
          <div className="lg:hidden">
            <SelectedFilters />
          </div>
          <div className="flex items-center justify-between">
            <div>
              {!loading ? (
                <span className="text-sm text-gray-500 font-medium tracking-wide">
                  {totalProducts} Products
                </span>
              ) : (
                <div className="h-8 rounded-md w-40 bg-[#f2f2f2] animate-pulse"></div>
              )}
            </div>
            <div className="hidden lg:block z-[1]">
              <DesktopSort />
            </div>
          </div>
          <div className="hidden lg:block">
            <SelectedFilters />
          </div>

          <div>
            {loading ? (
              <CollectionPageSkeleton />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-4 gap-2 lg:gap-x-4 lg:gap-y-8">
                {products.length === 0 ? (
                  <div className="col-span-full text-lg uppercase font-normal tracking-wide text-center text-gray-600">
                    No products found
                  </div>
                ) : (
                  products.map((item: any, index: number) => (
                    <div key={index}>
                      <MainProductCard data={item} />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Product Grid */}

          {isFetchingMore && (
            // Array(4)
            //   .fill(4)
            //   .map((_, i) => (
            //     <div
            //       key={`loading-${i}`}
            //       className="aspect-[4/5] bg-gray-100 animate-pulse rounded"
            //     ></div>
            //   ))
            <div className="flex items-center w-full justify-center p-10 ">
              <Loader size={30} className="animate-spin text-gray-500" />
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
