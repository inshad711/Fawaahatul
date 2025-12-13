"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface FilterState {
  [key: string]: string[];
}

export function useHandleFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({});

  // Initialize filters from URL on mount
  useEffect(() => {
    const initialFilters = Object.fromEntries(searchParams.entries());
    const initialState = Object.keys(initialFilters).reduce((acc, key) => {
      try {
        if (key === "price") {
          const [min, max] = initialFilters[key].split("-").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            acc[key] = [min.toString(), max.toString()];
          }
        } else {
          acc[key] = initialFilters[key].split(",").filter((v) => v);
        }
      } catch (error) {
        console.error(`Error parsing filter for key ${key}:`, error);
      }
      return acc;
    }, {} as FilterState);
    setFilters(initialState);
  }, [searchParams]);

  // Update URL with current filters
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          if (key === "price") {
            params.set(key, `${values[0]}-${values[1]}`);
          } else {
            params.set(key, values.join(","));
          }
        }
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  // Add or update a filter
  const addFilter = useCallback(
    (key: string, value: string | string[]) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        if (Array.isArray(value)) {
          newFilters[key] = value;
        } else {
          newFilters[key] = prev[key]?.includes(value)
            ? prev[key]
            : [...(prev[key] || []), value];
        }
        updateURL(newFilters);
        return newFilters;
      });
    },
    [updateURL]
  );

  // Remove a specific value from a filter
  const removeFilter = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        newFilters[key] = prev[key]?.filter((item) => item !== value) || [];
        if (newFilters[key].length === 0) {
          delete newFilters[key];
        }
        updateURL(newFilters);
        return newFilters;
      });
    },
    [updateURL]
  );

  // Clear a specific filter category
  const clearFilter = useCallback(
    (key: string) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[key];
        updateURL(newFilters);
        return newFilters;
      });
    },
    [updateURL]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    // setFilters({} as FilterState);
    router.push("?", { scroll: false });
  }, [router]);

  // Toggle a filter value (add if not present, remove if present)
  const toggleFilter = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        if (prev[key]?.includes(value)) {
          newFilters[key] = prev[key].filter((item) => item !== value);
          if (newFilters[key].length === 0) {
            delete newFilters[key];
          }
        } else {
          newFilters[key] = [...(prev[key] || []), value];
        }
        updateURL(newFilters);
        return newFilters;
      });
    },
    [updateURL]
  );

  return {
    filters,
    addFilter,
    removeFilter,
    clearFilter,
    clearAllFilters,
    toggleFilter,
  };
}
