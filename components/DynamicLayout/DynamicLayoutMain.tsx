"use client";

import { dynamicLayoutService } from "@/services/dynamicLayout";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import FallBackEmpty from "../Image/FallBackEmpty";

const DynamicLayoutMain = () => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    nextCursor: 1,
    totalRecords: 1,
  });
  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchLayout = async (cursor: number) => {
    if (isFetchingRef.current || cursor === null || cursor === 0) return;

    isFetchingRef.current = true;

    try {
      const isMobile = window.innerWidth <= 767;
      const response = isMobile
        ? await dynamicLayoutService.mobileDynamicLayout(cursor)
        : await dynamicLayoutService.desktopDynamicLayout(cursor);

      const result = response?.data;

      if (result?.data) {
        setData((prev) => {
          const isDuplicate = prev.some((item) => item.id === result.data.id);
          return isDuplicate ? prev : [...prev, result.data];
        });

        // ✅ If no nextCursor returned, mark it null to stop
        setPagination({
          nextCursor: result.nextCursor ?? null,
          totalRecords: result.totalRecords,
        });
      } else {
        // If no data returned, stop further attempts
        setPagination((prev: any) => ({ ...prev, nextCursor: null }));
      }
    } catch (error) {
      console.error("Error fetching layout:", error);
    }

    isFetchingRef.current = false;
  };

  useEffect(() => {
    // Load first chunk
    fetchLayout(1);
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const isMobile = window.innerWidth <= 767;
    const rootMarginValue = isMobile ? "400px 0px" : "600px 0px";

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.nextCursor !== null &&
          pagination.nextCursor !== 0
        ) {
          fetchLayout(pagination.nextCursor);
        }
      },
      {
        threshold: 1.0,
        rootMargin: rootMarginValue,
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [data, pagination.nextCursor]);

  return (
    <>
      <div className="h-600px]"></div>
      {data?.map((items: any, index: number) => {
        const removePadding = items.content?.length === 1;
        const gridColumns = items.content?.length;
        const isShopByNotes =
          items.main_heading?.toLowerCase().trim() === "shop by notes" ||
          items.main_heading?.toLowerCase().trim() === "shop by note";

        return (
          <div
            key={index}
            className={`${
              removePadding ? "" : "templateContainer space-y-8 py-6 md:py-8"
            }`}
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
                  ? `grid-cols-1 md:grid-cols-${
                      gridColumns > 6 ? "6" : gridColumns
                    } gap-8`
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
              {items?.content?.map((item: any, idx: number) => (
                <React.Fragment key={idx}>
                  {item.link ? (
                    <Link
                      data-aos="fade-up"
                      href={item.link}
                      className={`block ${
                        items.grid_no === 1 ? "" : "hover:-translate-y-2"
                      } duration-200 transition-all ease-linear w-full space-y-2.5 group`}
                    >
                      {item.type === "image" && (
                        <FallBackEmpty
                          src={item.src}
                          alt={item.alt || "Product Image"}
                          height={800}
                          width={800}
                          sizes="100vw"
                          className="w-full h-full object-cover duration-200"
                        />
                      )}
                      {item.type === "video" && (
                        <div data-aos="fade-up" className="w-full h-auto">
                          <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            src={item.src}
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
                      className={`${
                        items.grid_no === 1 ? "" : "hover:-translate-y-2"
                      } duration-200 transition-all ease-linear w-full space-y-2.5 group`}
                    >
                      {item.type === "image" && (
                        <FallBackEmpty
                          src={item.src}
                          alt={item.alt || "Product Image"}
                          height={800}
                          width={800}
                          sizes="100vw"
                          className="w-full h-full object-cover duration-200"
                        />
                      )}
                      {item.type === "video" && (
                        <div data-aos="fade-up" className="w-full h-auto">
                          <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            src={item.src}
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

      <div ref={sentinelRef} id="last-section" />
    </>
  );
};

export default DynamicLayoutMain;
