import React, { useContext } from "react";

import { StaticsContext } from "../context";
import { EmptyList } from "./emptyList.component";
import { RowCommands } from "./command.component";
import { SortDirectionIcon } from "./sortDirectionIcon.component";

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
  const { columns } = useContext(StaticsContext);

  return (
    <tr>
      <td>
        <div className="d-md-flex justify-content-start">
          <div className="row_index text-center d-block d-md-inline-block">
            {rowNumber}
          </div>
          <RowCommands key="1" id={id ?? rowNumber} />
        </div>
      </td>
      {columns.map((c, i) => (
        <Cell key={i} value={data[c.field]} classes={c.classes} />
      ))}
      {<MergedCell values={data} id={id ?? rowNumber} />}
    </tr>
  );
}

function Cell({ value, classes }) {
  return (
    <td
      data-testid="normal-row-cell"
      className={
        "text-center d-none d-md-table-cell" + (classes ? " " + classes : "")
      }
    >
      {getContent(value)}
    </td>
  );
}

function MergedCell({ values }) {
  const { columns, loadingtdColSpan } = useContext(StaticsContext);

  return (
    <td colSpan={loadingtdColSpan - 3} className="d-table-cell d-md-none">
      {columns.map((c, i) => (
        <div key={i}>
          <SortDirectionIcon fieldTitle={c.field} />
          {getContent(values[c.field], c.title)}
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
