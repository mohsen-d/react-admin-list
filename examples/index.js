import React from "react";
import { createRoot } from "react-dom/client";
import { useSearchParams, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Basic from "./basic.example";
import Columns from "./columns.example";
import Commands from "./commands.example";
import Crud from "./crud.example";
import Demo from "./demo.page";
import GetStarted from "./getstarted.example";
import Loading from "./loading.example";
import Options from "./options.example";
import Pagination from "./pagination.example";
import Search from "./search.example";
import Sort from "./sort.example";
import StickyTop from "./stickytop.example";
import Styles from "./styles.example";

const demos = {
  basic: <Basic />,
  columns: <Columns />,
  commands: <Commands />,
  crud: <Crud />,
  demo: <Demo />,
  getStarted: <GetStarted />,
  loading: <Loading />,
  options: <Options />,
  pagination: <Pagination />,
  search: <Search />,
  sort: <Sort />,
  stickytop: <StickyTop />,
  styles: <Styles />,
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = "basic";
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      return demos["getStarted"];
    case "/demo.html":
      return demos["demo"];
    default:
      return demos[searchParams.get("page") ?? "basic"];
  }
}

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
