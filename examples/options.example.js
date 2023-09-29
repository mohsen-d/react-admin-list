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

const normalOptions = {
  multipleSelection: true,
  edit: true,
  remove: true,
  new: true,
  sort: true,
  search: true,
};

export default function Options() {
  const [options, setOptions] = useState(normalOptions);

  return (
    <>
      <div>
        <input
          type="button"
          className="btn btn-secondary me-1"
          value="ReadOnly"
          onClick={() => setOptions(readOnlyOptions)}
        />
        <input
          type="button"
          className="btn btn-outline-secondary"
          value="Reset"
          onClick={() => setOptions(normalOptions)}
        />
      </div>
      <List data={data} columns={columns} options={options} />
    </>
  );
}
