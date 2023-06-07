import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import List from "./index.js";

const _data = [
  { _id: 1, title: "t1", author: "a1", published: "12/1/2020" },
  { _id: 2, title: "t2", author: "a2", published: "22/12/2021" },
  { _id: 3, title: "t3", author: "a3", published: "10/3/2022" },
  { _id: 4, title: "t4", author: "a4", published: "6/6/2023" },
];

export default function App() {
  const [keyword, setKeyword] = useState("javascript");
  const [data, setData] = useState(_data);

  const headers = [
    { title: "Title", canSortBy: true },
    { title: "Author", canSortBy: false },
    { title: "Published", canSortBy: true },
  ];

  const sort = {
    handler: async (by, direction) => {
      console.log("sorting by ", by, direction);
      setData((prev) => prev.filter((p) => 1 === 1));
    },
    sortBy: "Title",
    sortDirection: "1",
    sortFields: ["Title", "Author"],
  };

  const search = {
    handler: async (k) => {
      console.log("searching " + k);
      setKeyword(k);
      setData((prev) => prev.filter((p) => 1 === 1));
    },
    keyword: keyword,
  };

  const handleNew = async () => {
    console.log("new btn clicked");
    setData((prev) => prev.filter((p) => 1 === 1));
  };

  const handleEdit = async (ids) => {
    console.log("edit", ids);
    setData((prev) => prev.filter((p) => 1 === 1));
  };

  const handleDelete = async (ids) => {
    console.log("delete", ids);
    setData((prev) => prev.filter((p) => 1 === 1));
  };

  const pagination = {
    handler: async (p) => {
      console.log("getting page ", p);
      setData((prev) => prev.filter((p) => 1 === 1));
    },
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 85,
    urlTemplate: "/posts/page/#page",
  };

  const commands = [
    [
      {
        title: "display",
        icon: "bi-eye",
        className: "btn btn-outline-primary",
        needsConfirm: true,
        handler: async (ids) => {
          console.log("display", ids);
          setData((prev) => prev.filter((p) => 1 === 1));
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
    [
      {
        title: "display",
        icon: "bi-list-columns",
        className: "btn btn-outline-primary",
        needsConfirm: true,
        handler: (ids) => console.log("display", ids),
      },
      {
        title: "hide",
        icon: "bi-sticky",
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

  const loading = {
    handler: () => console.log("please wait..."),
    disableList: true,
  };

  const options = {
    // classes: "table-striped",
    // multipleSelection: true,
    // edit: false,
    // delete: false,
    // new: false,
    // sort: false,
    // search: false,
    // pagination: false,
  };

  const props = {
    options,
    headers,
    data,
    handleNew,
    handleEdit,
    handleDelete,
    search,
    sort,
    pagination,
    commands,
    loading,
  };

  return <List {...props} />;
}

if (typeof document !== "undefined") {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
}
