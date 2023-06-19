import React, { useContext } from "react";
import { DynamicsContext, StaticsContext } from "../context";

import { Search } from "./search.component";
import { Sort } from "./sort.component";

export function FormPlaceholder({ formToRender }) {
  const { currentSize } = useContext(DynamicsContext);
  const { options } = useContext(StaticsContext);

  const output = [];

  if ((formToRender === "sort" && options.sort) || currentSize >= 992)
    output.push(<Sort key="sort" />);

  if ((formToRender === "search" && options.search) || currentSize >= 992)
    output.push(<Search key="search" />);

  return currentSize >= 992 ? (
    <div className="d-flex justify-content-between">{output}</div>
  ) : (
    output
  );
}
