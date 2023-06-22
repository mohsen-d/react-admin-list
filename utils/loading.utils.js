import { defaultLoading } from "../defaults";

export function getLoadingInfo(userLoading) {
  const result = {};
  Object.assign(result, defaultLoading, userLoading);
  return result;
}
