import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], pageSize: number = 10) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(items.length / pageSize), [items.length, pageSize]);
  
  const paginatedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  const goToPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));
  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return { page, totalPages, paginatedItems, goToPage, nextPage, prevPage, setPage };
}