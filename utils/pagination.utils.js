import { defaultPagination } from "../defaults";

export function getPaginationInfo(userPagination, data) {
  const result = {};

  Object.assign(result, defaultPagination, userPagination);

  if (result.totalRecords < 1) result.totalRecords = data.length;

  return result;
}
