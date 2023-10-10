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
  pagination: false,
  multipleSelection: false,
  edit: false,
  remove: false,
};

const listData = data.concat(data).concat(data);

export default function StickyTop() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> StickyTop
        </h2>
        <p>
          To stick the upper part of the <mark>&lt;List&gt;</mark> to the top of
          the page when user scrolls down the page, set <mark>stickytop</mark>{" "}
          as <mark>true</mark> in{" "}
          <a href="/?demo=options">
            <mark>options</mark>
          </a>{" "}
          prop. <br /> <strong> (This is the default behaviour)</strong>
        </p>
        <p>
          <strong>
            This option may not work properly if <mark>list</mark> has a
            horizontal scroll
          </strong>
        </p>
        <pre>
          <code>{`const customOptions = {
    stickyTop: true
};
<List data={data} options={customOptions} />`}</code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <p>
        scroll down and notice that <mark>sort</mark>, <mark>search</mark> and{" "}
        <mark>headers</mark> stick to the top
      </p>
      <div className="mt-5">
        <List data={listData} columns={columns} options={options} />
      </div>
    </>
  );
}
