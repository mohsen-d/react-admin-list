import React, { useState } from "react";
import utils from "../utils/";
import { defaultPagination } from "../defaults";

export function Pagination({
  totalRecords,
  recordsPerPage,
  currentPage,
  urlTemplate,
  handler,
}) {
  const [currentSize, setCurrentSize] = useState(570);
  utils.currentWindowSize(setCurrentSize);

  const numberOfPages = Math.ceil(totalRecords / recordsPerPage);
  const numericPages =
    currentPage > 1
      ? [currentPage - 1, currentPage, currentPage + 1]
      : [1, 2, 3];

  async function handlePageChange(e) {
    if (handler) {
      e.preventDefault();
      return await handler(e.target.attributes["data-page"].value);
    }
  }

  function generateUrl(pageNumber) {
    return urlTemplate.replace("#page", pageNumber);
  }

  const className = `pagination justify-content-center${
    currentSize < 992 ? " pagination-lg" : ""
  }`;

  return numberOfPages > 1 ? (
    <nav>
      <ul className={className}>
        <li className="page-item">
          <a
            data-page={1}
            className="page-link"
            href={generateUrl(1)}
            onClick={handlePageChange}
          >
            &laquo;
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            data-page={numericPages[0]}
            href={generateUrl(numericPages[0])}
            onClick={handlePageChange}
          >
            &lsaquo;
          </a>
        </li>
        <li
          className={
            "page-item" + currentPage > 1 ? " d-none d-md-inline" : " disabled"
          }
        >
          <a
            data-page={numericPages[0]}
            className="page-link"
            href={generateUrl(numericPages[0])}
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
            href={generateUrl(numericPages[1])}
            onClick={handlePageChange}
          >
            {numericPages[1]}
          </a>
        </li>
        <li className="page-item d-none d-md-inline">
          <a
            data-page={numericPages[2]}
            className="page-link"
            href={generateUrl(numericPages[2])}
            onClick={handlePageChange}
          >
            {numericPages[2]}
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            data-page={numericPages[2]}
            href={generateUrl(numericPages[2])}
            onClick={handlePageChange}
          >
            &rsaquo;
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            data-page={numberOfPages}
            href={generateUrl(numberOfPages)}
            onClick={handlePageChange}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    ""
  );
}

export function getPaginationInfo(userPagination, data) {
  const result = {};

  Object.assign(result, defaultPagination, userPagination);

  if (result.totalRecords < 1) result.totalRecords = data.length;

  return result;
}
