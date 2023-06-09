import React, { useContext } from "react";

import { ListContext } from "../context";

import { RowCommands } from "./command.component";

export function Body({ list }) {
  const context = useContext(ListContext);
  return (
    <tbody>
      {list.length === 0 ? (
        <tr>
          <td className="text-center" colSpan={context.loadingtdColSpan}>
            Loading...
          </td>
        </tr>
      ) : (
        list.map((r, i) => <Row key={i} data={r} rowNumber={i + 1} />)
      )}
    </tbody>
  );
}

function Row({ rowNumber, data }) {
  const { _id, ...values } = data;

  const cells = Object.values(values);
  return (
    <tr>
      <td>
        <div className="text-center d-block d-md-inline me-md-2">
          {rowNumber}
        </div>
        <RowCommands key="1" id={_id} />
      </td>
      {cells.map((c, i) => (
        <Cell key={i} value={c} />
      ))}
      {<MergedCell values={cells} id={_id} />}
    </tr>
  );
}

function Cell({ value }) {
  return (
    <td className="text-center d-none d-md-table-cell">{getContent(value)}</td>
  );
}

function MergedCell({ values }) {
  const { sortInfo, headers, loadingtdColSpan } = useContext(ListContext);

  return (
    <td colSpan={loadingtdColSpan - 3} className="d-table-cell d-md-none">
      {values.map((v, i) => (
        <div key={i}>
          {headers[i].title === sortInfo.sortBy &&
          sortInfo.sortDirection !== "" ? (
            sortInfo.sortDirection === "1" ? (
              <span className="text-secondary">&#8675; </span>
            ) : (
              <span className="text-secondary">&#8673; </span>
            )
          ) : (
            <span className="pe-2">&nbsp;</span>
          )}
          {getContent(v, headers[i].title)}
        </div>
      ))}
    </td>
  );
}

function getContent(value, title = "") {
  return typeof value === "boolean" ? (
    <>
      <b>{title}</b>
      <i
        className={`${
          value ? "bi-check text-success ms-1" : "bi-dash text-secondary ms-1"
        }`}
      ></i>
    </>
  ) : (
    <>
      <b>{title}</b> {value}
    </>
  );
}
