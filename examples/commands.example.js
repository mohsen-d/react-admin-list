import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const commands = [
  [
    {
      title: "display",
      icon: "bi-eye",
      className: "btn btn-outline-primary",
      needsConfirm: true,
      handler: async (ids) => {
        console.log("display", ids);
      },
    },
    {
      title: "hide",
      icon: "bi-eye-slash",
      className: "btn btn-outline-secondary",
      needsConfirm: true,
      handler: (ids) => console.log("hide", ids),
    },
  ],
  {
    title: "print",
    className: "btn btn-outline-primary",
    needsConfirm: false,
    handler: (ids) => console.log("print", ids),
  },
];

export default function Commands() {
  return <List data={data} columns={columns} commands={commands} />;
}
