import { defaultSearch } from "../defaults";

export function getSearchInfo(userSearch) {
  const result = {};
  Object.assign(result, defaultSearch, userSearch);
  return result;
}
