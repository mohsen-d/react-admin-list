import React, { useContext } from "react";

import ListContext from "../context/list.context";

import Search from "./search.component";
import Sort from "./sort.component";

export default function FormPlaceholder({ formToRender }) {
  const context = useContext(ListContext);
  const output = [];

  if (
    (formToRender === "sort" && context.options.sort) ||
    context.currentSize >= 992
  )
    output.push(<Sort key="sort" />);

  if (
    (formToRender === "search" && context.options.search) ||
    context.currentSize >= 992
  )
    output.push(<Search key="search" />);

  return context.currentSize >= 992 ? (
    <div className="d-flex justify-content-between">{output}</div>
  ) : (
    output
  );
}
