import React, { useContext, useEffect } from "react";
import { ListContext } from "../context";

export function Search() {
  const handleNewSearch = useContext(ListContext).handleNewSearch;

  function handleKeyPress(e) {
    if (e.key === "Enter") handleNewSearch(e.target.value);
  }

  useEffect(() => {
    reset();
  }, []);

  function reset() {
    const elm = document.querySelector("#searchBox");
    elm.value = "";
    elm.focus();
  }

  return (
    <div className="my-3 ps-lg-2 position-relative flex-fill">
      <input
        id="searchBox"
        type="text"
        onKeyUp={handleKeyPress}
        className="form-control"
        placeholder="Type keyword then press Enter"
      />
      <i
        onClick={reset}
        className="bi-x position-absolute translate-middle end-0 top-50"
      />
    </div>
  );
}

export function CurrentSearchInfo() {
  const context = useContext(ListContext);

  return (
    <div className="my-3 mt-lg-0 position-relative">
      {context.keyword && context.keyword.length > 0 && (
        <div className="bg-secondary-subtle p-2 d-flex">
          <div className="flex-grow-1">Filtered by: {context.keyword}</div>
          <div className="me-2">
            <a
              role="button"
              className="text-success"
              onClick={() => context.handleNewSearch("")}
            >
              clear
            </a>
          </div>
          <div className="d-lg-none">
            {context.options.search && (
              <a
                role="button"
                className="text-primary"
                onClick={() => context.renderForm("search")}
              >
                another search
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
