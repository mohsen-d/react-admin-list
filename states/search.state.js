import { useState } from "react";
import { getSearchInfo } from "../utils";

export function useSearch(search) {
  const [searchInfo, setSearchInfo] = useState(getSearchInfo(search));

  function handleNewSearch(keyword) {
    setSearchInfo((prev) => ({
      ...prev,
      keyword: keyword,
    }));
  }

  return [searchInfo, handleNewSearch];
}
