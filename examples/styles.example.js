import React, { useState } from "react";
import List from "../index.js";
import { data } from "./data.js";

const columns = [
  { field: "title", title: "Title" },
  { field: "author", title: "Author" },
  { field: "pages", title: "Pages" },
  { field: "language", title: "Language" },
];

const gray = {
  container: "bg-secondary",
};

const blue = {
  container: "bg-info",
};

const normal = {
  container: "",
};

export default function Styles() {
  const [styles, setStyle] = useState(normal);

  function changeStyle(color) {
    switch (color) {
      case "gray":
        setStyle(gray);
        break;
      case "blue":
        setStyle(blue);
        break;
      default:
        setStyle(normal);
        break;
    }
  }

  return (
    <>
      <div>
        <input
          type="button"
          className="btn btn-secondary me-1"
          value="Gray"
          onClick={() => changeStyle("gray")}
        />
        <input
          type="button"
          className="btn btn-info me-1"
          value="Blue"
          onClick={() => changeStyle("blue")}
        />
        <input
          type="button"
          className="btn btn-outline-secondary"
          value="Reset"
          onClick={() => changeStyle("normal")}
        />
      </div>
      <List data={data} columns={columns} styles={styles} />
    </>
  );
}
