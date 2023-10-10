import React from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const options = {
  search: false,
  sort: false,
  new: false,
  edit: false,
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
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i className="bi bi-code-slash"></i> Commands
        </h2>
        <p>
          In almost every data model there are fields with boolean values such
          as <mark>isActive</mark> or <mark>isAdmin</mark> and etc.
          <br />
          These fields are suitable for batch updates in which user can change
          value of multiple records at once.
        </p>
        <p>
          To do so, you can define custom <mark>commands</mark> and pass them
          into <mark>&lt;List&gt;</mark>
        </p>
        <p>
          <mark>Commands</mark> prop accepts an array of <mark>command</mark>{" "}
          objects, each containing these properties:
          <ul>
            <li>
              <mark>title</mark> which is used as value for the associated
              button if <mark>icon</mark> is not set
            </li>
            <li>
              <mark>icon</mark> is the name of icon from{" "}
              <a target="_blank" href="https://icons.getbootstrap.com">
                <mark>bootstrap icons</mark>
              </a>{" "}
              collection
            </li>
            <li>
              <mark>className</mark> classes to be applied to the associated
              button
            </li>
            <li>
              <mark>needsConfirm</mark> to determine if a confirm modal should
              be displayed before calling <mark>handler</mark> or not
            </li>
            <li>
              <mark>handler</mark> callback function to be called when user
              clicks on the associated button.
            </li>
          </ul>
        </p>
        <strong>Related commands</strong>
        <p>
          If two or more commands are related like <mark>display</mark> and{" "}
          <mark>hide</mark> commands, they can be put inside an array. This way,
          they'll be rendered as a{" "}
          <a href="https://getbootstrap.com/docs/5.3/components/button-group/">
            <mark>button group</mark>
          </a>
        </p>
        <pre>
          <code className="language-javascript">
            {`const customCommands = [
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

<List data={data} commands={customCommands}/>`}
          </code>
        </pre>
      </div>
      <h3 className="mt-5">
        <i className="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List
          data={data}
          columns={columns}
          commands={commands}
          options={options}
        />
      </div>
    </>
  );
}
