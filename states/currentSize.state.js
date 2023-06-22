import { useState } from "react";
import * as utils from "../utils";

export function useCurrentSize() {
  const [currentSize, setCurrentSize] = useState(utils.currentWindowWidth);
  utils.watchWindowWidth(setCurrentSize);

  return currentSize;
}
