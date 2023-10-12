import { useState } from "react";
import {
  getPaginationInfo,
  regulateNumericPages,
  regulateNumberOfPages,
  regulateCurrentPage,
} from "../utils";

export function usePagination(pagination, data) {
  const { handler: pagingHandler, ...info } = getPaginationInfo(
    pagination,
    data
  );

  const [paginationInfo, setPaginationInfo] = useState(info);

  function handlePageChange(p) {
    setPaginationInfo((prev) => ({
      ...prev,
      currentPage: p,
      needToFetchData: true,
    }));
  }

  function updatePagingAfterDataChange(totalRecords, resetCurrentPage = false) {
    const numberOfPages = regulateNumberOfPages({
      totalRecords,
      recordsPerPage: paginationInfo.recordsPerPage,
    });

    const numericPages = regulateNumericPages({
      numberOfPages,
      currentPage: paginationInfo.currentPage,
    });

    const currentPage = resetCurrentPage
      ? regulateCurrentPage({
          numberOfPages,
          currentPage: paginationInfo.currentPage,
        })
      : paginationInfo.currentPage;

    setPaginationInfo((prev) => ({
      ...prev,
      totalRecords,
      numberOfPages,
      numericPages,
      currentPage,
      needToFetchData: false,
    }));
  }

  return [
    paginationInfo,
    pagingHandler,
    handlePageChange,
    updatePagingAfterDataChange,
  ];
}
