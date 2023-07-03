import React, { useContext } from "react";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";
import { SortDirectionIcon } from "./sortDirectionIcon.component";
import * as utils from "../utils";

export function Header({ columns }) {
  const { handleSelectAll } = useContext(HandlersContext);
  const { stickyElmsRef, options } = useContext(StaticsContext);

  function selectAll(e) {
    document.querySelectorAll(".form-check-input").forEach((ch) => {
      ch.checked = e.target.checked;
      handleSelectAll(e);
    });
  }

  return (
    <thead>
      <tr
        className="d-none d-md-table-row"
        ref={stickyElmsRef}
        data-sticky-classes="table-light"
      >
        <th className="col-md-2">
          <span className="row_index text-center d-md-inline-block">#</span>
          {options.multipleSelection && (
            <input
              type="checkbox"
              className="form-check-input"
              onChange={selectAll}
            />
          )}
        </th>
        {columns.map((c, i) => (
          <HeaderCell
            key={i}
            title={c.title}
            field={c.field}
            classes={c.classes}
          />
        ))}
      </tr>
    </thead>
  );
}

function HeaderCell({ title, field, classes }) {
  const { sortInfo } = useContext(DynamicsContext);
  const { handleSortChange } = useContext(HandlersContext);

  return (
    <th className={"text-center header_cell " + (classes ?? "")}>
      <SortDirectionIcon field={field} />
      <span>
        {utils.isSortable(field, sortInfo) ? (
          <a
            data-testid="sortable-header"
            href="#"
            data-sortby={field}
            onClick={handleSortChange}
          >
            {title}
          </a>
        ) : (
          title
        )}
      </span>
    </th>
  );
}
