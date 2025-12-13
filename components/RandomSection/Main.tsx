"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import FallBackEmpty from "../Image/FallBackEmpty";

interface ContentItem {
  src: string;
  alt: string;
  type: string;
  link: string;
  text: string;
}

interface SectionData {
  id: number;
  layout_type: string;
  grid_no: number;
  main_heading: string;
  description: string;
  status: boolean;
  layout_direction: string;
  content: ContentItem[];
}

interface ApiResponse {
  success: boolean;
  data: SectionData;
  nextCursor: number | null;
  totalRecords: number;
}

const Main: React.FC = () => {
  const path = usePathname();
  const [gridLength, setGridLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SectionData[]>([]);
  const [pagination, setPagination] = useState({
    nextCursor: 1,
    totalRecords: 1,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset data when the path changes
    setData([]);
    setPagination({
      nextCursor: 1,
      totalRecords: 1,
    });
  }, [path]);

  const isFetchingRef = useRef(false);

  const fetchData = async (abortSignal?: AbortSignal) => {
    if (
      isFetchingRef.current ||
      pagination.nextCursor === null ||
      pagination.nextCursor > pagination.totalRecords
    ) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/manage_home_layout_get?cursor=${pagination.nextCursor}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const result: ApiResponse = await response.json();

      if (result.data) {
        // Avoid duplicates by checking if ID already exists
        setData((prevData) => {
          const isDuplicate = prevData.some(
            (item) => item.id === result.data.id
          );
          return isDuplicate ? prevData : [...prevData, result.data];
        });
      }
      setPagination({
        nextCursor: result.nextCursor || 0,
        totalRecords: result.totalRecords,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optional: setData([]) here may be too aggressive, maybe just log error
    }

    setLoading(false);
    isFetchingRef.current = false;
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [path]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const isMobile = window.innerWidth <= 768;
    const rootMarginValue = isMobile ? "400px 0px" : "800px 0px";
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.nextCursor !== null &&
          pagination.nextCursor <= pagination.totalRecords
        ) {
          fetchData().then(() => {
            if (pagination.nextCursor === 0 || pagination.nextCursor === null) {
              observerRef.current?.disconnect();
            }
          });
        }
      },
      { threshold: 1.0, rootMargin: rootMarginValue }
    );

    const lastSection = document.getElementById("last-section");
    if (lastSection) observerRef.current.observe(lastSection);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [data]);

  if (data?.length <= 0) return null;

  return (
    <>
      {data?.map((items, index) => {
        const removePadding = items.content?.length === 1;
        // const removePadding = true;
        items.grid_no === 1 && items.layout_type === "video";
        const gridColumns = items.content?.length;
        const isShopByNotes =
          items.main_heading?.toLowerCase().trim() === "shop by notes" ||
          items.main_heading?.toLowerCase().trim() === "shop by note";
        return (
          <div
            key={index}
            className={`${
              removePadding ? "" : "templateContainer space-y-8 py-6 md:py-8"
            }  `}
          >
            <div className="space-y-2">
              {items.main_heading && (
                <h2
                  data-aos="fade-up"
                  className={`${removePadding ? "my-6" : ""} sectionHeading`}
                >
                  {items.main_heading}
                </h2>
              )}
              {items.description && (
                <p
                  data-aos="fade-up"
                  className="text-center max-w-lg mx-auto text-[0.85rem] tracking-wide text-templateText"
                >
                  {items.description}
                </p>
              )}
            </div>
            <div
              className={`grid h-full w-full ${
                items.layout_direction === "column"
                  ? `grid-cols-1 md:grid-cols-${gridColumns > 6 && "6"} gap-8`
                  : (() => {
                      if (isShopByNotes) {
                        return `grid-cols-4 gap-2 md:grid-cols-${gridColumns} lg:grid-cols-${gridColumns} md:gap-6 lg:gap-6 gap-y-4 lg:gap-y-8`;
                      }
                      if (removePadding) {
                        return `grid-cols-1 gap-4 md:grid-cols-${gridColumns} lg:grid-cols-${gridColumns} md:gap-6 lg:gap-6 gap-y-4 lg:gap-y-8`;
                      }
                      return `grid-cols-2 gap-4 md:grid-cols-${gridColumns} lg:grid-cols-${gridColumns} md:gap-6 lg:gap-6 gap-y-4 lg:gap-y-8`;
                    })()
              }`}
            >
              {items?.content?.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.link ? (
                    <Link
                      data-aos="fade-up"
                      key={idx}
                      href={item.link}
                      className={`block ${
                        items.grid_no === 1 ? "" : "hover:-translate-y-2"
                      } duration-200 transition-all ease-linear w-full space-y-2.5 group`}
                    >
                      {item.type === "image" && (
                        <FallBackEmpty
                          src={`${item.src}`}
                          alt={item.alt || "Product Image"}
                          height={800}
                          width={800}
                          sizes="100vw"
                          className="w-full h-full  object-cover duration-200"
                        />
                      )}
                      {item.type === "video" && (
                        <div data-aos="fade-up" className="w-full h-auto">
                          <video
                            autoPlay
                            muted
                            controls={false}
                            playsInline
                            preload="metadata"
                            loop
                            src={`${item.src}`}
                            className="w-full"
                          />
                        </div>
                      )}
                      {item.text && (
                        <h2 className="text-[15px] text-templateText duration-200 tracking-wide text-center">
                          {item.text}
                        </h2>
                      )}
                    </Link>
                  ) : (
                    <div
                      data-aos="fade-up"
                      key={idx}
                      className={` ${
                        items.grid_no === 1 ? "" : "hover:-translate-y-2"
                      } duration-200 transition-all ease-linear w-full space-y-2.5 group`}
                    >
                      {item.type === "image" && (
                        <FallBackEmpty
                          src={`${item.src}`}
                          alt={item.alt || "Product Image"}
                          height={800}
                          width={800}
                          sizes="100vw"
                          className="w-full h-full  object-cover duration-200"
                        />
                      )}
                      {item.type === "video" && (
                        <div data-aos="fade-up" className="w-full h-auto">
                          <video
                            autoPlay
                            muted
                            controls={false}
                            playsInline
                            preload="metadata"
                            loop
                            src={`${item.src}`}
                            className="w-full"
                          />
                        </div>
                      )}
                      {item.text && (
                        <h2 className="text-[15px] text-templateText duration-200 tracking-wide text-center">
                          {item.text}
                        </h2>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
      {loading && <p className="text-center"></p>}
      <div id="last-section"></div>
    </>
  );
};

export default Main;
