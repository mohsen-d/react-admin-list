/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DynamicsContext } from "../../context";
import { Pagination } from "../../components";

const handler = jest.fn();

function renderComponent({
  currentSize = 500,
  totalRecords = 12,
  recordsPerPage = 10,
  currentPage = 1,
}) {
  return render(
    <DynamicsContext.Provider value={{ currentSize }}>
      <Pagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        handler={handler}
      />
    </DynamicsContext.Provider>
  );
}

it("should render large version of pagination if window.width < 992", () => {
  renderComponent({});

  expect(screen.getByRole("list")).toHaveClass("pagination-lg");
});

it("should render default version of pagination if window.width >= 992", () => {
  renderComponent({ currentSize: 1024 });

  expect(screen.getByRole("list")).not.toHaveClass("pagination-lg");
});

it("should not render pagination if numberOfPages <= 1", () => {
  renderComponent({ totalRecords: 8 });
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});
