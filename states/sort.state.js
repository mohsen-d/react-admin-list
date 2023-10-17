import { setSortInfo } from "../utils";

const _sortInfo = {};
let _isSet = false;

export function useSort(sort, columns, data, setStatus) {
  if (!_isSet) {
    _isSet = true;
    setSortInfo(_sortInfo, sort, columns, data);
  }

  function handleSortChange(e) {
    e.preventDefault();

    let value = e.target.value || e.target.attributes["data-sortby"].value;
    let key = e.target.id || "sortBy";

    if (_sortInfo.sortBy && value === _sortInfo.sortBy) {
      key = "sortDirection";
      value = `${_sortInfo.sortDirection * -1}`;
    }

    _sortInfo[key] = value;
    setStatus("sortIt");
  }

  return [_sortInfo, handleSortChange];
}
