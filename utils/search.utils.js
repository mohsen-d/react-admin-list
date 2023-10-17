import { defaultSearch } from "../defaults";

export function setSearchInfo(output, userSearch) {
  Object.assign(output, defaultSearch, userSearch);
  return output;
}
