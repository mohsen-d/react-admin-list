import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const handleAdd = async () => {
  console.log("new btn clicked");
};

const handleEdit = async (ids) => {
  console.log("edit", ids);
};

const handleRemove = async (ids) => {
  console.log("delete", ids);
};

export default function Crud() {
  return (
    <List
      data={data}
      columns={columns}
      add={handleAdd}
      edit={handleEdit}
      remove={handleRemove}
    />
  );
}
