import React, { useContext } from "react";
import ListContext from "../context/list.context";

export default function Sort() {
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