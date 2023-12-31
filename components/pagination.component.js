import React, { useContext } from "react";

import { DynamicsContext } from "../context";
import "../assets/list.style.css";

export function Pagination({
  totalRecords,
  recordsPerPage,
  currentPage,
  numberOfPages,
  numericPages,
  handler,
}) {
  const { currentSize } = useContext(DynamicsContext);

  function handlePageChange(e) {
    handler(parseInt(e.target.attributes["data-page"].value));
  }

  const className = `pagination justify-content-center${
    currentSize < 992 ? " pagination-lg" : ""
  }`;

  return numberOfPages > 1 ? (
    <div className="d-lg-flex justify-content-between">
      <nav>
        <ul className={className}>
          <li className="page-item">
            <a data-page={1} className="page-link" onClick={handlePageChange}>
              &laquo;
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              data-page={currentPage === 1 ? 1 : currentPage - 1}
              onClick={handlePageChange}
            >
              &lsaquo;
            </a>
          </li>
          <li
            className={
              "page-item" +
              (currentPage === 1 ? " disabled" : " d-none d-md-inline")
            }
          >
            <a
              data-page={numericPages[0]}
              className="page-link"
              onClick={handlePageChange}
            >
              {numericPages[0]}
            </a>
          </li>
          <li
            className={
              "page-item" +
              (currentPage === numericPages[1]
                ? " disabled"
                : " d-none d-md-inline")
            }
          >
            <a
              data-page={numericPages[1]}
              className="page-link"
              onClick={handlePageChange}
            >
              {numericPages[1]}
            </a>
          </li>
          {numericPages[2] && (
            <li
              className={
                "page-item" +
                (currentPage === numericPages[2]
                  ? " disabled"
                  : " d-none d-md-inline")
              }
            >
              <a
                data-page={numericPages[2]}
                className="page-link"
                onClick={handlePageChange}
              >
                {numericPages[2]}
              </a>
            </li>
          )}
          <li className="page-item">
            <a
              className="page-link"
              data-page={
                currentPage === numberOfPages ? currentPage : currentPage + 1
              }
              onClick={handlePageChange}
            >
              &rsaquo;
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              data-page={numberOfPages}
              onClick={handlePageChange}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
      <PaginationDetails
        totalRecords={totalRecords}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        recordsPerPage={recordsPerPage}
      />
    </div>
  ) : (
    ""
  );
}

function PaginationDetails({
  totalRecords,
  numberOfPages,
  recordsPerPage,
  currentPage,
}) {
  const fromRecord = (currentPage - 1) * recordsPerPage + 1;
  const toRecord =
    currentPage * recordsPerPage < totalRecords
      ? currentPage * recordsPerPage
      : totalRecords;

  const output = `Page ${currentPage} of ${numberOfPages} - Records ${fromRecord} to ${toRecord} of ${totalRecords}`;

  return (
    <div className="pagination_details text-secondary text-center mb-2">
      {output}
    </div>
  );
}
