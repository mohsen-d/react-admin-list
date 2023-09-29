import React, { useContext } from "react";
import { DynamicsContext, StaticsContext } from "../context";

import { Search } from "./search.component";
import { Sort } from "./sort.component";

export function FormPlaceholder({ formToRender }) {
  const { currentSize } = useContext(DynamicsContext);
  const { options } = useContext(StaticsContext);

  const output = [];

  if (options.sort && (formToRender === "sort" || currentSize >= 992))
    output.push(<Sort key="sort" />);

  if (options.search && (formToRender === "search" || currentSize >= 992))
    output.push(<Search key="search" />);

  return currentSize >= 992 ? (
    <div data-testid="wrapper" className="d-flex justify-content-between">
      {output}
    </div>
  ) : (
    output
  );
}
