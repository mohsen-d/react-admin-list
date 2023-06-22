import React, { useContext } from "react";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";
import { SortDirectionIcon } from "./sortDirectionIcon.component";

export function Header({ list }) {
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
          <span className="me-md-2">#</span>
          {options.multipleSelection && (
            <input
              type="checkbox"
              className="form-check-input"
              onChange={selectAll}
            />
          )}
        </th>
        {list.map((h, i) => (
          <HeaderCell key={i} title={h.title} classes={h.classes} />
        ))}
      </tr>
    </thead>
  );
}

function HeaderCell({ title, classes }) {
  const { sortInfo } = useContext(DynamicsContext);
  const { handleSortChange } = useContext(HandlersContext);

  return (
    <th className={"text-center " + (classes ?? "")}>
      <SortDirectionIcon fieldTitle={title} />
      <span>
        {sortInfo.sortFields.includes(title) ? (
          <a data-sortby={title} onClick={handleSortChange} href={title}>
            {title}
          </a>
        ) : (
          title
        )}
      </span>
    </th>
  );
}
