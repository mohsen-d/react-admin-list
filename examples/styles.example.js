import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const styleOne = {
  container: "bg-body-tertiary p-3",
  table: "table-warning table-striped",
};

const blue = {
  container: "bg-info",
};

const normal = {
  container: "",
};

export default function Styles() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i class="bi bi-code-slash"></i> Styles
        </h2>
        <p>
          custom classes can be applied to the <mark>&lt;div&gt;</mark> wrapping
          the <mark>&lt;List&gt;</mark> and also the <mark>&lt;table&gt;</mark>{" "}
          containing the data through the <mark>styles</mark> prop.
        </p>
        <pre>
          <code>{`const customStyle = {
  container: "bg-body-tertiary p-3",
  table: "table-warning table-striped",
};
<List data={data} styles={customStyle} />`}</code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i class="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-5">
        <List data={data} columns={columns} styles={styleOne} />
      </div>
    </>
  );
}
