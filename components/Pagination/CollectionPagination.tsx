"use client";

import { Pagination } from "antd";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

const CollectionPagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center">
      <Pagination
        current={currentPage}
        total={totalPages * 10} // Antd expects total items (not total pages), so we fake it
        pageSize={10} // This makes 1 page = 10 items, just for display purposes
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CollectionPagination;
