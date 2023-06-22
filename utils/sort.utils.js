import { defaultSort } from "../defaults";

export const getSortInfo = (userSort, userHeaders, data) => {
  const result = {};
  Object.assign(result, defaultSort, userSort);

  if (result.sortFields.length === 0)
    result.sortFields = getSortFields(userHeaders, data);

  return result;
};

function getSortFields(headers, data) {
  if (headers.length > 0) {
    const definedInHeaders = headers
      .filter((h) => h.canSortBy)
      .map((h) => h.title);
    if (definedInHeaders.length > 0) return definedInHeaders;
  }

  if (data.length > 0) {
    return Object.keys(data[0]);
  }

  return [];
}
