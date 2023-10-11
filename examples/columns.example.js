import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title", canSortBy: true, classes: "col-6" },
  { field: "author", title: "Author", classes: "col-3" },
  { field: "pages", title: "Pages", canSortBy: true, classes: "col-1" },
  { field: "language", classes: "col-2" },
];

const options = {
  search: false,
  new: false,
  edit: false,
  remove: false,
  sort: true,
};

export default function Columns() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> Columns
        </h2>
        <p>
          In cases where data includes so many fields and you only wants to show
          few of them in the <mark>&lt;List&gt;</mark>, You can define the
          fields that <mark>&lt;List&gt;</mark> should display by passing a{" "}
          <mark>columns</mark> prop.
          <br />
          <mark>columns</mark> prop is an array of objects, each of them
          containing 4 properties:
          <br />
          <ul>
            <li>
              <mark>field</mark> : name of the field in passed data
            </li>
            <li>
              <mark>title</mark> : title you want to be shown as column's header
              in the list
            </li>
            <li>
              <mark>canSortBy</mark> : Can user sort list by this field? This
              will be ignored if <mark>sortFields</mark> are defined in{" "}
              <a href="?demo=sort">
                <mark>sort</mark>
              </a>{" "}
              prop
            </li>
            <li>
              <mark>classes</mark> : classes to be applied to column.
            </li>
          </ul>
          <p>
            If <mark>title</mark> is not provided, <mark>field</mark> value will
            be used as column's header.
          </p>
        </p>
        <pre>
          <code className="language-javascript">
            {`const columns = [
  { field: "title", title: "Title", canSortBy: true, classes: "col-6" },
  { field: "author", title: "Author", classes: "col-3" },
  { field: "pages", title: "Pages", canSortBy: true, classes: "col-1" },
  { field: "language", classes: "col-2" },
];`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List data={data} columns={columns} options={options} />
      </div>
    </>
  );
}
