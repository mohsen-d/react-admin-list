import React, { useContext } from "react";
import { DynamicsContext } from "../context";

export function SortDirectionIcon({ field }) {
  const { sortInfo } = useContext(DynamicsContext);

  return field === sortInfo.sortBy ? (
    sortInfo.sortDirection === "1" ? (
      <span data-testid="asc-sort-direction-icon" className="text-secondary">
        &#8675;
      </span>
    ) : (
      <span data-testid="desc-sort-direction-icon" className="text-secondary">
        &#8673;
      </span>
    )
  ) : (
    <span data-testid="no-sort-direction-icon" className="pe-2">
      &nbsp;
    </span>
  );
}
