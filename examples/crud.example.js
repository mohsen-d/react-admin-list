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
};

const handleAdd = async () => {
  console.log("new btn clicked");
};

const handleEdit = async (ids) => {
  console.log("edit", ids);
};

const handleRemove = async (ids) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("delete", ids);
      resolve();
    }, 2000);
  });
};

export default function Crud() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i className="bi bi-code-slash"></i> CRUD
        </h2>
        <p>
          By providing <mark>add</mark>, <mark>edit</mark> and{" "}
          <mark>remove</mark> props, you can replace default behaviour when user
          clicks on <mark>crud</mark> icons.
        </p>
        <h3 className="mt-4">Add</h3>
        <p>
          If adding new items is enabled in{" "}
          <a href="?demo=options">
            <mark>options</mark>
          </a>{" "}
          but no custom handler is provided, clicking on <mark>+</mark> icon
          will add <mark>&page=new</mark> to the url. This can be then used to
          render a new <mark>form</mark> component in which user can create new
          items.
        </p>
        <p>
          But you can provide acustom handler by passing a <mark>add</mark> prop
          into <mark>list</mark> component.
        </p>
        <pre>
          <code className="language-javascript">
            {`const handleAdd = () => {
  console.log("new btn clicked");
  // your custom logic
};

<List data={data} add={handleAdd}/>`}
          </code>
        </pre>

        <h3 className="mt-5">Edit</h3>
        <p>
          Just like <mark>add</mark>, if editing is enabled in{" "}
          <a href="?demo=options">
            <mark>options</mark>
          </a>{" "}
          but no custom handler is provided, clicking on{" "}
          <mark>
            <i className="bi bi-pencil-square"></i>
          </mark>{" "}
          icon will add <mark>&edit=id</mark> to the url. This can be then used
          to render a new <mark>form</mark> component in which user can edit the
          item with given id.
        </p>
        <p>
          But you can provide acustom handler by passing a <mark>edit</mark>{" "}
          prop into <mark>list</mark> component.
        </p>
        <p>
          The id of the selected row will be passed into the custom handler in
          the form of an array with a single item.
        </p>

        <p>
          <strong>User can only edit one row. </strong>
          <br /> If he selects multiple rows, the edit icon at the top of the
          list will disappear. Editing multiple rows is possible through{" "}
          <a href="?demo=options">
            <mark>commands</mark>
          </a>{" "}
          prop.
        </p>
        <pre>
          <code className="language-javascript">
            {`const handleEdit = (ids) => {
  console.log("edit", ids); // output -> edit [1]
  // Your custom logic
};

<List data={data} edit={handleEdit}/>`}
          </code>
        </pre>

        <h3 className="mt-5">Remove</h3>
        <p>
          Contrary to <mark>add</mark> and <mark>edit</mark>, if{" "}
          <mark>remove</mark> prop is not provided, no <mark>remove</mark> icon
          will be shown, even if it's enabled in{" "}
          <a href="?demo=options">
            <mark>options</mark>
          </a>
        </p>
        <p>
          List of the <mark>ids</mark> of the selected rows will be passed into
          provided <mark>remove</mark> handler in an array.
        </p>
        <p>
          <strong>
            User can select multiple rows and remove them at once.
          </strong>
        </p>
        <pre>
          <code className="language-javascript">
            {`const handleRemove = (ids) => {
  console.log("remove", ids); // output -> remove [1, 4, 6]
  // Your delete logic
};
<List data={data} remove={handleRemove}/>`}
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
          add={handleAdd}
          edit={handleEdit}
          remove={handleRemove}
          options={options}
        />
      </div>
    </>
  );
}
