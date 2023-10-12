import { useState } from "react";
import { getSortInfo } from "../utils";

export function useSort(sort, columns, data) {
  const { handler: sortHandler, ...info } = getSortInfo(sort, columns, data);
  const [sortInfo, setSortInfo] = useState(info);

  function handleSortChange(e) {
    e.preventDefault();

    let value = e.target.value || e.target.attributes["data-sortby"].value;
    let key = e.target.id || "sortBy";

    if (sortInfo.sortBy && value === sortInfo.sortBy) {
      key = "sortDirection";
      value = `${sortInfo.sortDirection * -1}`;
    }

    setSortInfo((prev) => {
      return { ...prev, [key]: value };
    });
  }

  return [sortInfo, sortHandler, handleSortChange];
}
