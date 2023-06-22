import React, { useContext } from "react";
import { DynamicsContext, StaticsContext } from "../context";

export function SortDirectionIcon({ fieldTitle }) {
  const { headers } = useContext(StaticsContext);
  const { sortInfo } = useContext(DynamicsContext);

  return fieldTitle === sortInfo.sortBy ? (
    sortInfo.sortDirection === "1" ? (
      <span className="text-secondary">&#8675; </span>
    ) : (
      <span className="text-secondary">&#8673; </span>
    )
  ) : (
    <span className="pe-2">&nbsp;</span>
  );
}
