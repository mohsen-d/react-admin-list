import { setSearchInfo } from "../utils";

const _searchInfo = {};
let _isSet = false;

export function useSearch(search, setStatus) {
  if (!_isSet) {
    setSearchInfo(_searchInfo, search);
    _isSet = true;
  }

  function handleNewSearch(keyword) {
    _searchInfo.keyword = keyword;
    setStatus("searchIt");
    console.log("stateChange", _searchInfo);
  }

  return [_searchInfo, handleNewSearch];
}
