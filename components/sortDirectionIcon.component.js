import React, { useContext } from "react";
import { DynamicsContext } from "../context";

export function SortDirectionIcon({ field }) {
  const { sortInfo } = useContext(DynamicsContext);

  return field === sortInfo.sortBy ? (
    sortInfo.sortDirection === "1" ? (
      <span className="text-secondary">&#8675; </span>
    ) : (
      <span className="text-secondary">&#8673; </span>
    )
  ) : (
    <span className="pe-2">&nbsp;</span>
  );
}
