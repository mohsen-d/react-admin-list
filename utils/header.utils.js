export function getHeaders(userHeaders, data) {
  if (userHeaders.length > 0)
    return userHeaders.map((h) => (typeof h === "string" ? { title: h } : h));

  if (data.length > 0)
    return Object.keys(data[0]).map((k) => ({
      title: k,
    }));

  return [{ title: "No headers defined" }];
}
