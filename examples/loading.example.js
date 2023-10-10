import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const customLoading = {
  handler: (operation, step) => {
    const elm = document.getElementById("loading");
    step === "started"
      ? elm.classList.remove("d-none")
      : elm.classList.add("d-none");
  },
  disableList: false,
  isLoading: false,
};

const sort = {
  handler: async (sortInfo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  },
};

const options = {
  new: false,
  edit: false,
  remove: false,
  search: false,
  multipleSelection: false,
};

export default function Loading() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> Loading
        </h2>
        <p>
          You can choose what shall happen while an operation is taking place by
          passing a <mark>loading</mark> prop.
          <br />
          <mark>loading</mark> object can contain:
          <br />
          <ul>
            <li>
              <mark>handler</mark>: a callback function in which you can react
              to an operation. If provided, <mark>handler</mark> will be called
              twice. Once before action starts and again when action has ended.
              It accepts 2 parameters: <br />
              1- <mark>operation</mark> which indicates the action that is about
              to be performed (sort, search, delete).
              <br />
              2- <mark>state</mark> which returns <mark>started</mark> or{" "}
              <mark>ended</mark>.
            </li>
            <li>
              <mark>disableList</mark>: should list be disabled during an
              action? <br />
              default value is <mark>true</mark>
            </li>
            <li>
              <mark>isLoading</mark>: should list be in loading state in first
              load? This is useful when data is being fetched in an async
              operation. <br />
              default value is <mark>false</mark>
            </li>
          </ul>
        </p>
        <pre>
          <code className="language-javascript">
            {`const customLoading = {
  handler: (operation, state) => {
    const elm = document.getElementById("loading");
    state === "started"
      ? elm.classList.remove("d-none")
      : elm.classList.add("d-none");
  },
  disableList: false,
  isLoading: false,
};

<List data={data} loading={customLoading} />`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <h4>Default loading</h4>
        <List data={data} columns={columns} sort={sort} options={options} />
      </div>
      <div>
        <h4>Custom laoding</h4>
        <p></p>
        <div id="loading" className="d-none text-secondary my-1">
          Please wait ...
        </div>
        <List
          data={data}
          columns={columns}
          loading={customLoading}
          sort={sort}
          options={options}
        />
      </div>
    </>
  );
}
