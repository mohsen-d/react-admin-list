export function getColumns(userColumns, data) {
  const columns = extractColumns(userColumns, data);
  const columnsProxy = createProxy(columns);
  return columnsProxy;
}

function extractColumns(userColumns, data) {
  if (userColumns.length > 0)
    return userColumns.map((c) =>
      typeof c === "string" ? { field: c, title: c } : c
    );

  if (data.length > 0)
    return Object.keys(data[0]).map((k) => ({
      field: k,
      title: k,
    }));

  return [{ title: "No headers defined" }];
}

function createProxy(columns) {
  const handler = {
    get: (target, property) => {
      if (target[property]) return target[property];
      if (property === "field") return target["title"].toLowerCase();
      if (property === "title") return target["field"];
    },
  };

  return columns.map((c) => new Proxy(c, handler));
}
