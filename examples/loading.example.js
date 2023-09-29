import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const laodingOne = {
  handler: () => {
    const elm = document.getElementById("loading");
    elm.classList.remove("d-none");
  },
  disableList: true,
  isLoading: false,
};

const laodingTwo = {
  handler: () => {},
  disableList: false,
  isLoading: false,
};

const sort = {
  handler: async (sortInfo) => {
    const date1 = Date.now();
    while (Date.now() - date1 < 5000) {}

    console.log(`sorting list by ${sortInfo.sortBy} ${sortInfo.sortDirection}`);
  },
};

export default function Loading() {
  const [loading, setLoading] = useState(laodingOne);

  return (
    <>
      <div>
        <input
          type="button"
          className="btn btn-primary me-1"
          value="Sort & list remains active & no handler"
          onClick={() => setLoading(laodingTwo)}
        />
        <input
          type="button"
          className="btn btn-success"
          value="Sort & list becomes disabled & with handler"
          onClick={() => setLoading(laodingOne)}
        />
      </div>
      <div id="loading" className="d-none bg-success">
        Please wait ...
      </div>
      <List data={data} columns={columns} loading={loading} sort={sort} />
    </>
  );
}
