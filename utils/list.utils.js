export function listIsRealyEmpty(isLoading, keyword, data) {
  return data.length === 0 && !isLoading && keyword === "";
}

export function defaultFetch(
  data,
  useSearch,
  SearchInfo,
  useSort,
  sortInfo,
  usePaging,
  pagingInfo,
  status
) {
  let result = data;

  if (usePaging) pagingInfo.totalRecords = data.length;
  if (status === "searching") pagingInfo.currentPage = 1;

  if (useSearch) {
    const keyword = SearchInfo.keyword;
    if (keyword) {
      result = result.filter((r) =>
        Object.values(r).some((v) =>
          typeof v === "string" ? v.includes(keyword) : v == keyword
        )
      );
    }
    if (status === "searching") pagingInfo.recalculateInfo(result.length);
  }

  if (useSort && sortInfo.sortBy) {
    result = result.toSorted((a, b) => {
      const bv =
        typeof b[sortInfo.sortBy] === "string"
          ? b[sortInfo.sortBy].toUpperCase()
          : b[sortInfo.sortBy].toString();
      const av =
        typeof a[sortInfo.sortBy] === "string"
          ? a[sortInfo.sortBy].toUpperCase()
          : a[sortInfo.sortBy].toString();

      if (av < bv) {
        return sortInfo.sortDirection === "1" ? -1 : 1;
      }
      if (av > bv) {
        return sortInfo.sortDirection === "1" ? 1 : -1;
      }

      return 0;
    });
  }

  if (usePaging) {
    if (status === "changingPage") pagingInfo.recalculateInfo(result.length);
    const from = pagingInfo.recordsPerPage * (pagingInfo.currentPage - 1);
    const to = pagingInfo.recordsPerPage * pagingInfo.currentPage;
    result = result.filter((d, i) => i + 1 > from && i + 1 <= to);
  }

  if (status === "done") {
    result.forEach(
      (r, i) =>
        (r.rowNumber =
          pagingInfo.recordsPerPage * (pagingInfo.currentPage - 1) + (i + 1))
    );
  }

  return result;
}
