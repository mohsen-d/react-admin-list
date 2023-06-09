import React, { useContext } from "react";
import ListContext from "../context/list.context";

export default function Header({ list }) {
  const context = useContext(ListContext);

  function selectAll(e) {
    document.querySelectorAll(".form-check-input").forEach((ch) => {
      ch.checked = e.target.checked;
      context.handleSelectAll(e);
    });
  }

  return (
    <thead>
      <tr className="d-none d-md-table-row">
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
        {list.map((l, i) => (
          <HeaderCell key={i} title={l} />
        ))}
      </tr>
    </thead>
  );
}

function HeaderCell({ title }) {
  const { sortInfo, handleSortChange } = useContext(ListContext);

  return (
    <th className="text-center">
      {title === sortInfo.sortBy ? (
        sortInfo.sortDirection === "1" ? (
          <span className="text-secondary">&#8675; </span>
        ) : (
          <span className="text-secondary">&#8673; </span>
        )
      ) : (
        <span className="pe-2">&nbsp;</span>
      )}

      {sortInfo.sortFields.includes(title) ? (
        <a
          data-sortby={title}
          onClick={handleSortChange}
          href={"/sort/" + title}
        >
          {title}
        </a>
      ) : (
        title
      )}
    </th>
  );
}
