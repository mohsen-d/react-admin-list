import React, { useContext } from "react";
import { DynamicsContext, HandlersContext } from "../context";

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
          {sortInfo.sortFields.map(({ field, title }, i) => (
            <option key={field} value={field}>
              {title}
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
