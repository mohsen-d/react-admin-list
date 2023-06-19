import React, { useContext } from "react";

import { DynamicsContext, StaticsContext } from "../context";
import { EmptyList } from "./emptyList.component";
import { RowCommands } from "./command.component";

export function Body({ list }) {
  const { options, loadingtdColSpan } = useContext(StaticsContext);

  return (
    <tbody>
      {list.length === 0 ? (
        <tr>
          <td className="text-center border-0 pt-5" colSpan={loadingtdColSpan}>
            <EmptyList />
          </td>
        </tr>
      ) : (
        list.map((r, i) => (
          <Row
            key={r[options.keyField]}
            id={r[options.keyField]}
            data={r}
            rowNumber={i + 1}
          />
        ))
      )}
    </tbody>
  );
}

function Row({ rowNumber, data, id }) {
  const { headers } = useContext(StaticsContext);

  const cells = Object.values(data);

  return (
    <tr>
      <td>
        <div className="row_index text-center d-block d-md-inline-block me-md-2">
          {rowNumber}
        </div>
        <RowCommands key="1" id={id ?? rowNumber} />
      </td>
      {cells.map((c, i) => (
        <Cell key={i} value={c} classes={headers[i].classes} />
      ))}
      {<MergedCell values={cells} id={id ?? rowNumber} />}
    </tr>
  );
}

function Cell({ value, classes }) {
  return (
    <td
      className={
        "text-center d-none d-md-table-cell" + (classes ? " " + classes : "")
      }
    >
      {getContent(value)}
    </td>
  );
}

function MergedCell({ values }) {
  const { headers, loadingtdColSpan } = useContext(StaticsContext);
  const { sortInfo } = useContext(DynamicsContext);

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
