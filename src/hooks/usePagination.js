import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = useCallback(
    (page) => {
      setSearchParams({ page });
    },
    [setSearchParams]
  );

  return {
    currentPage: parseInt(searchParams.get("page") || 1),
    totalPage,
    setTotalPage,
    handlePageChange,
  };
};

export default usePagination;
