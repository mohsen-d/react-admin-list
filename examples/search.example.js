import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const options = {
  multipleSelection: false,
  new: false,
  edit: false,
  remove: false,
  sort: false,
};

let keyword = "";

export default function Search() {
  const [listData, setListData] = useState(data);

  const search = {
    handler: async (kw) => {
      keyword = kw;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const result =
            kw === ""
              ? data
              : data.filter(
                  (d) =>
                    d.title.includes(kw) ||
                    d.author.includes(kw) ||
                    d.language.includes(kw) ||
                    d.pages == kw
                );
          setListData(result);
          resolve();
        }, 2000);
      });
    },
    keyword: keyword,
  };

  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i className="bi bi-code-slash"></i> Search
        </h2>
        <p>
          <mark>Search</mark> is enabled by default, but you can disable it
          through{" "}
          <a href="?demo=options">
            <mark>options</mark>
          </a>{" "}
          prop.
          <br />
          Its default behaviour is to add <mark>&keyword=value</mark> to url.
          But it can be customized by passing a <mark>search</mark> prop into{" "}
          <mark>&lt;List&gt;</mark>.
        </p>
        <p>
          A custom <mark>search</mark> object contains:
        </p>
        <ul>
          <li>
            <mark>handler</mark> which is the callback function to be called
            when user presses <mark>Enter</mark>
          </li>
          <li>
            <mark>keyword</mark> which is the keyword (if exists) in first
            render of the list
          </li>
        </ul>
        <pre>
          <code className="language-javascript">
            {`const [listData, setListData] = useState(data);
const [keyword, setKeyword] = useState("");

const customSearch = {
  handler: async (kw) => {
    console.log("searching " + kw);
    setKeyword(kw);
    const searchResult = await db.find();
    setListData(searchResult);
  },
  keyword: keyword,
};

<List data={listData} search={search} />`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i className="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List
          data={listData}
          columns={columns}
          search={search}
          options={options}
        />
      </div>
    </>
  );
}
