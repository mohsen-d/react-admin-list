import { useState } from "react";

export function useSelection(data, keyField) {
  const [selectedIds, setSelectedIds] = useState([]);

  function handleSelection(e) {
    setSelectedIds((currentIds) =>
      e.target.checked
        ? [...currentIds, e.target.id]
        : currentIds.filter((i) => i !== e.target.id)
    );
  }

  function handleSelectAll(e) {
    setSelectedIds(e.target.checked ? data.map((d) => d[keyField]) : []);
  }

  return [selectedIds, handleSelection, handleSelectAll];
}
