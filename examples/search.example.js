import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

let keyword = "";

const search = {
  handler: async (kw) => {
    console.log("searching " + kw);
    keyword = kw;
  },
  keyword: keyword,
};

export default function Search() {
  return <List data={data} columns={columns} search={search} />;
}
