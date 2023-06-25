import { defaultSort } from "../defaults";

export const getSortInfo = (userSort, columns, data) => {
  const result = {};
  Object.assign(result, defaultSort, userSort);

  if (result.sortFields.length === 0)
    result.sortFields = getSortFields(columns, data);

  return result;
};

function getSortFields(columns, data) {
  if (columns.length > 0) {
    const definedInColumns = columns
      .filter((c) => c.canSortBy)
      .map((c) => c.title);
    if (definedInColumns.length > 0) return definedInColumns;
  }

  if (data.length > 0) {
    return Object.keys(data[0]);
  }

  return [];
}
