/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DynamicsContext } from "../../context";
import { SortDirectionIcon } from "../../components";

function renderComponent({ field = "", sortBy = "", sortDirection = "1" }) {
  return render(
    <DynamicsContext.Provider
      value={{
        sortInfo: { sortBy, sortFields: [], sortDirection },
      }}
    >
      <SortDirectionIcon field={field} />
    </DynamicsContext.Provider>
  );
}

it("should render <span> without direction icon if currentField <> sortInfo.sortBy", () => {
  renderComponent({ field: "title", sortBy: "date" });
  expect(screen.queryByTestId("no-sort-direction-icon")).toBeInTheDocument();
});

it("should render ascending direction icon if sortInfo.sortDirection === 1", () => {
  renderComponent({ field: "date", sortBy: "date" });
  expect(screen.queryByTestId("asc-sort-direction-icon")).toBeInTheDocument();
});

it("should render descending direction icon if sortInfo.sortDirection === 2", () => {
  renderComponent({ field: "date", sortBy: "date", sortDirection: 2 });
  expect(screen.queryByTestId("desc-sort-direction-icon")).toBeInTheDocument();
});
