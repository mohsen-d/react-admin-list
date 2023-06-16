import { useState } from "react";
import { getPaginationInfo } from "../components";

export function usePagination(pagination, data) {
  const [paginationInfo, setPaginationInfo] = useState(
    getPaginationInfo(pagination, data)
  );

  function handlePageChange(p) {
    setPaginationInfo((prev) => ({
      ...prev,
      currentPage: p,
    }));
  }

  return [paginationInfo, handlePageChange];
}
