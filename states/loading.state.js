import { useState } from "react";
import { getLoadingInfo } from "../utils";

export function useLoading(loading) {
  const [loadingInfo, setLoadingInfo] = useState(() => getLoadingInfo(loading));

  function setIsLoading(isLoading) {
    setLoadingInfo((prev) => ({
      ...prev,
      isLoading,
    }));
  }

  return [loadingInfo, setIsLoading];
}
