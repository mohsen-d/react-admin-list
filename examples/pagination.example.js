import React, { useEffect, useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const options = {
  new: false,
  edit: false,
  remove: false,
  sort: false,
  search: false,
  multipleSelection: false,
};

let currentPage = 1;
const recordsPerPage = 4;
const totalRecords = data.length;

function fetchData() {
  const from = recordsPerPage * (currentPage - 1);
  const to = recordsPerPage * currentPage;
  return data.filter((d) => d._id > from && d._id <= to);
}

export default function Pagination() {
  const [listData, setData] = useState(fetchData());

  const pagination = {
    handler: async (p) => {
      currentPage = parseInt(p);
      setData(fetchData());
    },
    currentPage,
    recordsPerPage,
    totalRecords,
  };

  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> Paging
        </h2>
        <p>
          <mark>Paging</mark> is enabled by default, but you can disable it
          through{" "}
          <a href="?demo=options">
            <mark>options</mark>
          </a>{" "}
          prop.
          <br />
          Its default behaviour is to add <mark>&page=value</mark> to url. But
          it can be customized by passing a <mark>pagination</mark> prop into{" "}
          <mark>&lt;List&gt;</mark>.
        </p>
        <p>
          A custom <mark>pagination</mark> object contains:
        </p>
        <ul>
          <li>
            <mark>handler</mark> which is the callback function to be called
            when user clicks on oone of <mark>paging</mark> links.
          </li>
          <li>
            <mark>currentPage</mark> : default value is <mark>0</mark>
          </li>
          <li>
            <mark>recordsPerPage</mark> : default value is <mark>10</mark>
          </li>
          <li>
            <mark>totalRecords</mark> : default value is the length of data
            array passed into the <mark>&lt;List&gt;</mark>
          </li>
        </ul>
        <pre>
          <code>{`const pagination = {
  handler: async (p) => {
    currentPage = parseInt(p);
    // Your custom logic
  },
  currentPage: 0,
  recordsPerPage: 4,
  totalRecords: 10,
};
          
<List data={listData} pagination={pagination} />`}</code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List
          data={listData}
          columns={columns}
          pagination={pagination}
          options={options}
        />
      </div>
    </>
  );
}
