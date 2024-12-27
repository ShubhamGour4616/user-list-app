import { useMemo, useState, useEffect } from "react";

interface PaginationResult<T> {
  currentItems: T[];
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
  currentPage: number;
  setPage: (page: number) => void;
}

export const usePagination = <T>(
  items: T[],
  itemsPerPage: number,
  initialPage = 1
): PaginationResult<T> => {
  const [page, setPage] = useState(initialPage);

  console.log(page, "page");
  useEffect(() => {
    setPage(1); // Reset to the first page when items change
  }, [items.length]);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage) || 1,
    [items.length, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, page, itemsPerPage]);

  return {
    currentItems,
    totalPages,
    nextPage: () => setPage((prev) => Math.min(prev + 1, totalPages)),
    prevPage: () => setPage((prev) => Math.max(prev - 1, 1)),
    canNextPage: page < totalPages,
    canPrevPage: page > 1,
    currentPage: page,
    setPage,
  };
};
