import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const sort = {
  handler: async (sortInfo) => {
    console.log(`sorting list by ${sortInfo.sortBy} ${sortInfo.sortDirection}`);
  },
  sortBy: "title",
  sortDirection: "1",
  sortFields: [
    "title",
    { field: "author" },
    { field: "language", title: "lang" },
  ],
};

export default function Sort() {
  return <List data={data} columns={columns} sort={sort} />;
}
