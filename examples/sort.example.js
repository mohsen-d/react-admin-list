import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const options = {
  multipleSelection: false,
  new: false,
  edit: false,
  remove: false,
  search: false,
};

function sortIt(sortInfo) {
  return data.toSorted((a, b) => {
    const bv = b[sortInfo.sortBy].toUpperCase();
    const av = a[sortInfo.sortBy].toUpperCase();

    if (av < bv) {
      return sortInfo.sortDirection === "1" ? -1 : 1;
    }
    if (av > bv) {
      return sortInfo.sortDirection === "1" ? 1 : -1;
    }

    return 0;
  });
}

export default function Sort() {
  const [listData, setListData] = useState(
    sortIt({ sortBy: "title", sortDirection: "1" })
  );

  const sort = {
    handler: async (sortInfo) => {
      console.log(
        `sorting list by ${sortInfo.sortBy} ${sortInfo.sortDirection}`
      );

      return new Promise((resolve, reject) => {
        const result = sortIt(sortInfo);

        setTimeout(() => {
          console.log(result);
          setListData(result);
          resolve();
        }, 2000);
      });
    },
    sortBy: "title",
    sortDirection: "1",
    sortFields: [
      "title",
      { field: "author" },
      { field: "language", title: "lang" },
    ],
  };

  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i className="bi bi-code-slash"></i> Sort
        </h2>
        <p>
          <mark>Sort</mark> is enabled by default, but you can disable it
          through{" "}
          <a href="/?demo=options">
            <mark>options</mark>
          </a>{" "}
          prop.
          <br />
          Its default behaviour is to add{" "}
          <mark>&sortby=value&sortdirection=value</mark> to url. But it can be
          customized by passing a <mark>sort</mark> prop into{" "}
          <mark>&lt;List&gt;</mark>.
        </p>
        <p>
          A custom <mark>sort</mark> object can include:
        </p>
        <ul>
          <li>
            <mark>handler</mark> which is the callback function to be called
            when user clicks on <mark>sortable</mark> column headers or choose a
            field from <mark>sort</mark> dropdownlist.
          </li>
          <li>
            <mark>sortBy</mark> which is the field data is sorted by in the
            first render of the list.
          </li>
          <li>
            <mark>sortDirection</mark> direction (1 or -1) in which data is
            sorted in the first render.
          </li>
          <li>
            <mark>sortFields</mark> To determine the fields by which users can
            sort the list. It accepts an array of values : <br />
            1- <mark>string</mark>: name of field, or
            <br />
            2- <mark>object</mark>: with 2 props. <mark>field</mark> and{" "}
            <mark>title</mark> which is the name to be displayed in
            dropdownlist.
          </li>
        </ul>
        <p>
          <strong className="attention">
            If <mark>sortField</mark> is not provided,
            <a href="/?demo=columns">
              <mark>columns</mark>
            </a>{" "}
            prop will be used if defined.
          </strong>
        </p>
        <pre>
          <code className="language-javascript">
            {`const [listData, setListData] = useState(data);
const customSort = {
  handler: async (sortInfo) => {
    console.log(\`sorting list by \${sortInfo.sortBy} \${sortInfo.sortDirection}\`);
    // Your custom logic
  },
  sortBy: "title",
  sortDirection: "1",
  sortFields: [
    "title",
    { field: "author" },
    { field: "language", title: "lang" },
  ],
};

<List data={listData} sort={customSort} />`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i className="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List data={listData} columns={columns} sort={sort} options={options} />
      </div>
    </>
  );
}
