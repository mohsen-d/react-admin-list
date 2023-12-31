import { defaultSort } from "../defaults";

export const setSortInfo = (output, userSort, columns, data) => {
  Object.assign(output, defaultSort, userSort);

  if (output.sortFields.length === 0)
    output.sortFields = getSortFields(columns, data);
  else formatStringSortFields(output.sortFields);

  createProxy(output.sortFields);

  return output;
};

export const isSortable = (currentField, sortInfo) => {
  return sortInfo.sortFields.some(({ field }) => field === currentField);
};

function getSortFields(columns, data) {
  if (columns.length > 0) {
    const definedInColumns = columns.filter((c) => c.canSortBy);

    if (definedInColumns.length > 0) return definedInColumns;
  }

  if (data.length > 0) {
    return Object.keys(data[0]).map((k) => ({ field: k, title: k }));
  }

  return [];
}

function formatStringSortFields(fields) {
  fields.forEach((f, i, fs) => {
    if (typeof f === "string") fs[i] = { field: f, title: f };
  });
}

function createProxy(fields) {
  const handler = {
    get: (target, property) => {
      if (target[property]) return target[property];
      if (property === "field") return target["title"];
      if (property === "title") return target["field"];
    },
  };

  fields.forEach((f, i, fs) => (fs[i] = new Proxy(f, handler)));
}
