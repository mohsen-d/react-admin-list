import { useState } from "react";
import { getSearchInfo } from "../utils";

export function useSearch(search) {
  const { handler: searchHandler, ...info } = getSearchInfo(search);
  const [searchInfo, setSearchInfo] = useState(info);

  function handleNewSearch(keyword) {
    setSearchInfo((prev) => ({
      ...prev,
      keyword: keyword,
    }));
  }

  return [searchInfo, searchHandler, handleNewSearch];
}
