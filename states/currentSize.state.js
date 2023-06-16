import { useState } from "react";
import utils from "../utils";

export function useCurrentSize() {
  const [currentSize, setCurrentSize] = useState(utils.currentWindowWidth);
  utils.watchWindowWidth(setCurrentSize);

  return currentSize;
}
