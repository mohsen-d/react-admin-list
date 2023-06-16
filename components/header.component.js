import React, { useContext } from "react";
import { ListContext } from "../context";

export function Header({ list }) {
  const context = useContext(ListContext);

  function selectAll(e) {
    document.querySelectorAll(".form-check-input").forEach((ch) => {
      ch.checked = e.target.checked;
      context.handleSelectAll(e);
    });
  }

  return (
    <thead>
      <tr
        className="d-none d-md-table-row"
        ref={context.stickyElmsRef}
        data-sticky-classes="table-light"
      >
        <th className="col-md-2">
          <span className="me-md-2">#</span>
          {context.options.multipleSelection && (
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
  const { sortInfo, handleSortChange } = useContext(ListContext);

  const isCurrentSortField = title === sortInfo.sortBy;

  return (
    <th className={"text-center " + (classes ?? "")}>
      {isCurrentSortField ? (
        sortInfo.sortDirection === "1" ? (
          <span className="text-secondary">&#8675; </span>
        ) : (
          <span className="text-secondary">&#8673; </span>
        )
      ) : (
        <span className="pe-2">&nbsp;</span>
      )}
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
