import React, { useContext } from "react";
import { DynamicsContext, HandlersContext } from "../context";

import { defaultSort } from "../defaults";

export function Sort() {
  const { sortInfo, currentSize } = useContext(DynamicsContext);
  const { handleSortChange } = useContext(HandlersContext);

  return (
    <div
      className={`d-flex flex-fill my-3 pe-lg-2${
        currentSize >= 992 ? " border-end" : ""
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
          onChange={handleSortChange}
          value={sortInfo.sortBy}
        >
          {sortInfo.sortBy === "" && (
            <option key={-1} value="">
              Sort By
            </option>
          )}
          {sortInfo.sortFields.map((f, i) => (
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
          onChange={handleSortChange}
          value={sortInfo.sortDirection}
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
    if (definedInHeaders.length > 0) return definedInHeaders;
  }

  if (data.length > 0) {
    return Object.keys(data[0]);
  }

  return [];
}
