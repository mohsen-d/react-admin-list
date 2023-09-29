import { defaultPagination } from "../defaults";

export function getPaginationInfo(userPagination, data) {
  const result = {};

  Object.assign(result, defaultPagination, userPagination);

  regulateInfo(result, data);

  return result;
}

function regulateInfo(info, data) {
  if (info.totalRecords < 1) info.totalRecords = data.length;

  info.numberOfPages = Math.ceil(info.totalRecords / info.recordsPerPage);

  if (info.currentPage > info.numberOfPages)
    info.currentPage = info.numberOfPages;
  if (info.currentPage < 1) info.currentPage = 1;

  info.numericPages = [
    info.currentPage - 1,
    info.currentPage,
    info.currentPage + 1,
  ];

  if (info.currentPage === 1) info.numericPages = [1, 2, 3];
  if (info.currentPage === info.numberOfPages) {
    info.numericPages = [
      info.currentPage - 2,
      info.currentPage - 1,
      info.currentPage,
    ];
  }
}
