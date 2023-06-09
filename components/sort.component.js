import React, { useContext } from "react";
import { ListContext } from "../context";

import { defaultSort } from "../defaults";

export function Sort() {
  const context = useContext(ListContext);

  return (
    <div
      className={`d-flex flex-fill my-3 pe-lg-2${
        context.currentSize >= 992 ? " border-end" : ""
      }`}
    >
      <div className="d-flex align-items-center text-center text-secondary px-1">
        <label className="align-bottom" htmlFor="sortBy">
          Sort:
        </label>
      </div>
      <div className="flex-grow-1 me-1">
        <select
          id="sortBy"
          className="form-select"
          onChange={context.handleSortChange}
          value={context.sortInfo.sortBy}
        >
          {context.sortInfo.sortBy === "" && (
            <option key={-1} value="">
              Sort By
            </option>
          )}
          {context.sortInfo.sortFields.map((f, i) => (
            <option key={i} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="sortDirection"
          className="form-select"
          onChange={context.handleSortChange}
          value={context.sortInfo.sortDirection}
        >
          <option value="1">A &raquo; Z</option>
          <option value="-1">Z &raquo; A</option>
        </select>
      </div>
    </div>
  );
}

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
    if (definedInHeaders.length > 0) return { sortFields: definedInHeaders };
  }

  if (data.length > 0) {
    return { sortFields: Object.keys(data[0]) };
  }

  return [];
}
