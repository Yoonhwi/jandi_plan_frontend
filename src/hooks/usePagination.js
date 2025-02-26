import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (name = "page") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = useCallback(
    (page) => {
      setSearchParams({ [name]: page });
    },
    [name, setSearchParams]
  );

  return {
    currentPage: parseInt(searchParams.get(name) || 1),
    totalPage,
    setTotalPage,
    handlePageChange,
  };
};

export default usePagination;
