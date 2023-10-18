import React, { useEffect, useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

let keyword = "";
let sortBy = "";
let sortDirection = "1";
let currentPage = 1;
const recordsPerPage = 4;
let totalRecords = data.length;

const columns = [
  { field: "title", title: "Title", canSortBy: true, classes: "col-5" },
  { field: "author", title: "Author", canSortBy: true, classes: "col-3" },
  { field: "year", title: "Year", canSortBy: true, classes: "col-1" },
  { field: "pages", title: "Pages", canSortBy: true, classes: "col-1" },
  { field: "language", title: "Lang", canSortBy: true, classes: "col-2" },
];

function sortIt(listData, sortInfo) {
  return listData.toSorted((a, b) => {
    const bv =
      typeof b[sortInfo.sortBy] === "string"
        ? b[sortInfo.sortBy].toUpperCase()
        : b[sortInfo.sortBy];
    const av =
      typeof a[sortInfo.sortBy] === "string"
        ? a[sortInfo.sortBy].toUpperCase()
        : a[sortInfo.sortBy];

    if (av < bv) {
      return sortInfo.sortDirection === "1" ? -1 : 1;
    }
    if (av > bv) {
      return sortInfo.sortDirection === "1" ? 1 : -1;
    }

    return 0;
  });
}

function fetchData() {
  let result = data;

  if (keyword !== "") {
    result = result.filter(
      (d) =>
        d.title.includes(keyword) ||
        d.author.includes(keyword) ||
        d.language.includes(keyword) ||
        d.pages == keyword ||
        d.year == keyword
    );
  }

  if (sortBy !== "") result = sortIt(result, { sortBy, sortDirection });

  totalRecords = result.length;

  const numberOfPages = Math.ceil(totalRecords / recordsPerPage);

  if (currentPage > numberOfPages) {
    currentPage = numberOfPages;
  }

  const from = recordsPerPage * (currentPage - 1);
  const to = recordsPerPage * currentPage;

  return result.filter((d, i) => i + 1 > from && i + 1 <= to);
}

let addCallback;

export default function Demo() {
  const [listData, setListData] = useState(fetchData);
  const [currentView, setCurrentView] = useState("list");

  function cancelHandler() {
    setCurrentView("list");
  }

  // add
  const addHandler = function (cb) {
    addCallback = cb;
    setCurrentView("newForm");
  };

  // remove
  const removeHandler = function (ids, cb) {
    ids.forEach((id) => {
      const index = data.findIndex((r) => r._id === id);
      data.splice(index, 1);
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        setListData(fetchData());
        cb(totalRecords);
        resolve();
      }, 1000);
    });
  };

  // sort
  const sort = {
    handler: (sortInfo, cb) => {
      sortBy = sortInfo.sortBy;
      sortDirection = sortInfo.sortDirection;

      return new Promise((resolve) => {
        setTimeout(() => {
          setListData(fetchData());
          cb(totalRecords);
          resolve();
        }, 1000);
      });
    },
  };

  // search
  const search = {
    handler: (kw, cb) => {
      keyword = kw;
      currentPage = 1;
      return new Promise((resolve) => {
        setTimeout(() => {
          setListData(fetchData());
          cb(totalRecords);
          resolve();
        }, 1000);
      });
    },
    keyword,
  };

  // paging
  const pagination = {
    handler: (p, cb) => {
      currentPage = parseInt(p);
      return new Promise((resolve) => {
        setTimeout(() => {
          setListData(fetchData());
          cb(totalRecords);
          resolve();
        }, 1000);
      });
    },
    currentPage,
    recordsPerPage,
    totalRecords,
  };

  function saveHandler(e) {
    e.preventDefault();
    const newRecord = Object.fromEntries(new FormData(e.target));
    newRecord._id = data.length + 1;
    data.push(newRecord);
    setListData(fetchData());
    addCallback(totalRecords);
    setCurrentView("list");
  }

  return (
    <>
      <div>
        <a href="index.html">
          <i className="bi bi-arrow-left-short"></i> Return
        </a>
      </div>
      <h1 className="mt-5">
        <i className="bi bi-book"></i> Books
      </h1>
      <div className="mt-4">
        {currentView === "list" ? (
          <List
            data={listData}
            remove={removeHandler}
            search={search}
            sort={sort}
            columns={columns}
            pagination={pagination}
            add={addHandler}
          />
        ) : (
          <NewForm saveHandler={saveHandler} cancelHandler={cancelHandler} />
        )}
      </div>
    </>
  );
}

function NewForm({ saveHandler, cancelHandler }) {
  return (
    <form onSubmit={saveHandler}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pages" className="form-label">
          Pages
        </label>
        <input
          type="text"
          className="form-control"
          id="pages"
          name="pages"
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          type="text"
          className="form-control"
          id="year"
          name="year"
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <label htmlFor="language" className="form-label">
          Language
        </label>
        <input
          type="text"
          className="form-control"
          id="language"
          name="language"
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-success mb-3 me-1">
          Save
        </button>
        <button
          onClick={cancelHandler}
          type="button"
          className="btn btn-secondary mb-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
