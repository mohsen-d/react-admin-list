import React, { useContext, useEffect } from "react";
import { DynamicsContext, HandlersContext, StaticsContext } from "../context";

function reset() {
  const listSearchBox = document.querySelector("#searchBox");
  listSearchBox.value = "";
  listSearchBox.focus();
}

export function Search() {
  const { handleNewSearch } = useContext(HandlersContext);

  function handleKeyPress(e) {
    if (e.key === "Enter") handleNewSearch(e.target.value);
  }

  useEffect(() => {
    reset();
  }, []);

  return (
    <div
      data-testid="search"
      className="my-3 ps-lg-2 position-relative flex-fill"
    >
      <input
        id="searchBox"
        data-testid="searchBox"
        type="text"
        onKeyUp={handleKeyPress}
        className="form-control"
        placeholder="Type keyword then press Enter"
      />
      <i
        data-testid="resetButton"
        onClick={reset}
        className="bi-x position-absolute translate-middle end-0 top-50"
      />
    </div>
  );
}

export function CurrentSearchInfo() {
  const { searchInfo } = useContext(DynamicsContext);
  const { handleNewSearch, renderForm } = useContext(HandlersContext);
  const { options } = useContext(StaticsContext);

  return searchInfo.keyword && searchInfo.keyword.length > 0 ? (
    <div
      data-testid="currentSearchInfo"
      className="my-3 mt-lg-0 position-relative"
    >
      <div className="bg-secondary-subtle p-2 d-flex">
        <div className="flex-grow-1">Filtered by: {searchInfo.keyword}</div>
        <div className="me-2">
          <a
            data-testid="currentSearch-reset-button"
            role="button"
            className="text-success"
            onClick={() => {
              reset();
              handleNewSearch("");
            }}
          >
            clear
          </a>
        </div>
        <div className="d-lg-none">
          {options.search && (
            <a
              data-testid="newSearchButton"
              role="button"
              className="text-primary"
              onClick={() => renderForm("search")}
            >
              new search
            </a>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
