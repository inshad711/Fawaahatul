"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useHandleSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<string | null>(null);

  // Initialize sort from URL on mount
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    setSort(sortParam || null);
  }, [searchParams]);

  // Update URL with current sort
  const updateURL = useCallback(
    (newSort: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (newSort) {
        params.set("sort", newSort);
      } else {
        params.delete("sort");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Set a new sort option
  const setSortOption = useCallback(
    (value: string) => {
      setSort(value);
      updateURL(value);
    },
    [updateURL]
  );

  // Clear sort
  const clearSort = useCallback(() => {
    setSort(null);
    updateURL(null);
  }, [updateURL]);

  return {
    sort,
    setSortOption,
    clearSort,
  };
}
