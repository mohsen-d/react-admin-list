import { useState } from "react";
import { getSearchInfo } from "../components";

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
