import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const readOnlyOptions = {
  multipleSelection: false,
  edit: false,
  remove: false,
  new: false,
  sort: false,
  search: false,
};

export default function Options() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> Options
        </h2>
        <p>
          You have the ability to control what functionalities shall be
          available by passing an <mark>options</mark> prop.
          <br />
          Functionalities that can be disabled/enabled are:
          <br />
          <ul>
            <li>
              <mark>multipleSelection</mark>: unable/enable user to select
              multiple rows to perform an operation on them.
            </li>
            <li>
              <mark>new</mark>: unable/enable user to create new items
            </li>
            <li>
              <mark>edit</mark>: unable/enable user to edit current items
            </li>
            <li>
              <mark>remove</mark>: unable/enable user to delete current items
            </li>
            <li>
              <mark>search</mark>: disable/enable search field
            </li>
            <li>
              <mark>sort</mark>: disable/enable sort functionalities
            </li>
            <li>
              <mark>pagination</mark>: disable/enable paging
            </li>
            <li>
              <mark>stickyTop</mark>: stick list's header to the top of the page
              when scrolling
            </li>
            <li>
              <mark>keyField</mark> default value is <mark>_id</mark>
            </li>
          </ul>
          <p>
            <strong>By default all these functionalities are enabled.</strong>
          </p>
        </p>
        <pre>
          <code className="language-javascript">
            {`const readOnlyOptions = {
  multipleSelection: false,
  edit: false,
  remove: false,
  new: false,
  sort: false,
  search: false,
  pagination: false,
  keyField: "id",
  stickyTop: true,
};

<List data={data} options={readOnlyOptions} />`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List data={data} columns={columns} options={readOnlyOptions} />
      </div>
    </>
  );
}
