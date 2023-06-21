import React, { useContext, useState } from "react";

import { defaultPagination } from "../defaults";
import { DynamicsContext } from "../context";
import "../assets/list.style.css";

export function Pagination({
  totalRecords,
  recordsPerPage,
  currentPage,
  handler,
}) {
  console.log("rendered Paging");
  const { currentSize } = useContext(DynamicsContext);
  const numberOfPages = Math.ceil(totalRecords / recordsPerPage);
  const numericPages =
    currentPage > 1
      ? [currentPage - 1, currentPage, currentPage + 1]
      : [1, 2, 3];

  function handlePageChange(e) {
    handler(parseInt(e.target.attributes["data-page"].value));
  }

  const className = `pagination justify-content-center${
    currentSize < 992 ? " pagination-lg" : ""
  }`;

  return numberOfPages > 1 ? (
    <div className="d-lg-flex justify-content-between">
      <PaginationDetails
        totalRecords={totalRecords}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        recordsPerPage={recordsPerPage}
      />
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
              data-page={numericPages[0]}
              onClick={handlePageChange}
            >
              &lsaquo;
            </a>
          </li>
          <li
            className={
              "page-item" + currentPage > 1
                ? " d-none d-md-inline"
                : " disabled"
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
              (currentPage == 1 ? " d-none d-md-inline" : " disabled")
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
          <li className="page-item d-none d-md-inline">
            <a
              data-page={numericPages[2]}
              className="page-link"
              onClick={handlePageChange}
            >
              {numericPages[2]}
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              data-page={numericPages[2]}
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

export function getPaginationInfo(userPagination, data) {
  const result = {};

  Object.assign(result, defaultPagination, userPagination);

  if (result.totalRecords < 1) result.totalRecords = data.length;

  return result;
}
