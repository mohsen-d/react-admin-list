export function listIsRealyEmpty(isLoading, keyword, data) {
  return data.length === 0 && !isLoading && keyword === "";
}
