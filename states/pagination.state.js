import {
  setPaginationInfo,
  regulateNumericPages,
  regulateNumberOfPages,
  regulateCurrentPage,
} from "../utils";

const _pagination = {};
let _isSet = false;

export function usePagination(pagination, totalRecords, setStatus) {
  if (!_isSet) {
    setPaginationInfo(_pagination, pagination, totalRecords);
    _isSet = true;
  }

  function handlePageChange(p) {
    _pagination.currentPage = p;
    setStatus("changePage");
  }

  _pagination.recalculateInfo = function (totalRecords) {
    setStatus("done");
    this.totalRecords = totalRecords;

    this.numberOfPages = regulateNumberOfPages({
      totalRecords,
      recordsPerPage: this.recordsPerPage,
    });

    this.numericPages = regulateNumericPages({
      numberOfPages: this.numberOfPages,
      currentPage: this.currentPage,
    });

    this.currentPage = regulateCurrentPage({
      numberOfPages: this.numberOfPages,
      currentPage: this.currentPage,
    });
  };

  return [_pagination, handlePageChange];
}
