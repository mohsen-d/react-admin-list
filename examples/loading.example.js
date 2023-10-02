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
      <div>
        <h2>Default loading</h2>
        <List data={data} columns={columns} sort={sort} options={options} />
      </div>
      <div>
        <h2>Custom laoding</h2>
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
