import React from "react";
import List from "../index.js";
import { data } from "./data.js";

export default function Basic() {
  return (
    <>
      <div className="lh-lg">
        <h2 className="mb-4">
          <i className="bi bi-code-slash"></i> Basic usage
        </h2>
        <p>
          <mark>&lt;List&gt;</mark> only requires its <mark>data</mark> prop to
          work. Other props are optional.
        </p>
        <h4>Data structure</h4>
        <p>
          {" "}
          Expected <mark>data</mark> structure is an array of objects.
        </p>
        <pre>
          <code className="language-javascript">
            {`const data = [
  {
    _id: 1,
    author: "Chinua Achebe",
    country: "Nigeria",
    imageLink: "images/things-fall-apart.jpg",
    language: "English",
    link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    _id: 2,
    author: "Hans Christian Andersen",
    country: "Denmark",
    imageLink: "images/fairy-tales.jpg",
    language: "Danish",
    link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  }
];

<List data={data} />`}
          </code>
        </pre>
        <p>
          Functionalities such as{" "}
          <a href="/?demo=search">
            <mark>search</mark>
          </a>{" "}
          ,{" "}
          <a href="/?demo=sort">
            <mark>sort</mark>
          </a>{" "}
          ,{" "}
          <a href="/?demo=pagination">
            <mark>paging</mark>
          </a>{" "}
          and etc are generated based on the <mark>data</mark> passed into the{" "}
          <mark>&lt;List&gt;</mark>.
        </p>
        <h4>List of props</h4>
        <ul>
          <li>
            <mark>columns</mark> : selected fields of the data to display in the
            list.
          </li>
          <li>
            <mark>commands</mark> : custom commands to run on the list records.
          </li>
          <li>
            <mark>new</mark> : custom handler for new button
          </li>
          <li>
            <mark>edit</mark> : custom handler for edit button
          </li>
          <li>
            <mark>remove</mark> : handler for delete button (if not provided,
            delete buttons will not render)
          </li>
          <li>
            <mark>loading</mark> : custom loading handler
          </li>
          <li>
            <mark>options</mark> : options to disable/enable list
            functionalities
          </li>
          <li>
            <mark>pagination</mark> : custom handler for paging
          </li>
          <li>
            <mark>search</mark> : custom handler for searching functionality
          </li>
          <li>
            <mark>sort</mark> : custom handler to handle sorting
          </li>
          <li>
            <mark>styles</mark> : to apply custom classes to the list.
          </li>
        </ul>
      </div>
      <h3 className="mt-5">
        <i className="bi bi-box-arrow-down"></i> Output
      </h3>
      <div className="mt-4">
        <List data={data} />
        <br />
      </div>
    </>
  );
}
