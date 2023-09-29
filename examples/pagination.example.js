import React, { useEffect, useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

let currentPage = 1;
const recordsPerPage = 4;
const totalRecords = data.length;

function fetchData() {
  const from = recordsPerPage * (currentPage - 1);
  const to = recordsPerPage * currentPage;
  return data.filter((d) => d._id > from && d._id <= to);
}

export default function Pagination() {
  const [_data, setData] = useState(fetchData());

  const pagination = {
    handler: async (p) => {
      currentPage = parseInt(p);
      setData(fetchData());
    },
    currentPage,
    recordsPerPage,
    totalRecords,
  };

  return <List data={_data} columns={columns} pagination={pagination} />;
}
