import { defaultPagination } from "../defaults";

export function getPaginationInfo(userPagination, data) {
  const result = {};

  Object.assign(result, defaultPagination, userPagination);

  regulateInfo(result, data);

  return result;
}

function regulateInfo(info, data) {
  regulateTotalRecords(info, data);
  info.numberOfPages = regulateNumberOfPages(info);
  info.currentPage = regulateCurrentPage(info);
  info.numericPages = regulateNumericPages(info);
  console.log(info);
}

export function regulateTotalRecords(info, data) {
  if (info.totalRecords < 1) info.totalRecords = data.length;
}

export function regulateNumberOfPages(info) {
  return Math.ceil(info.totalRecords / info.recordsPerPage);
}

export function regulateCurrentPage(info) {
  if (info.currentPage > info.numberOfPages) return info.numberOfPages;
  if (info.currentPage < 1) return 1;
  return info.currentPage;
}

export function regulateNumericPages(info) {
  if (info.numberOfPages < 3) {
    return [1, 2];
  }

  let numericPages = [
    info.currentPage - 1,
    info.currentPage,
    info.currentPage + 1,
  ];

  if (info.currentPage === 1) numericPages = [1, 2, 3];
  if (info.currentPage === info.numberOfPages) {
    numericPages = [
      info.currentPage - 2,
      info.currentPage - 1,
      info.currentPage,
    ];
  }

  return numericPages;
}
