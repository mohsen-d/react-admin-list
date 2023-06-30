/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DynamicsContext, HandlersContext } from "../../context";
import { Sort } from "../../components";

const handleSortChange = jest.fn();

function renderComponent({ sortBy = "", currentSize = 500 }) {
  return render(
    <HandlersContext.Provider value={{ handleSortChange }}>
      <DynamicsContext.Provider
        value={{
          currentSize,
          sortInfo: { sortBy, sortFields: [], sortDirection: "1" },
        }}
      >
        <Sort />
      </DynamicsContext.Provider>
    </HandlersContext.Provider>
  );
}

it("should render a border-right if window.width >= 992", () => {
  renderComponent({ currentSize: 1024 });
  expect(screen.queryByTestId("sort")).toHaveClass("border-end");
});

it("should not render a border-right if window.width < 992", () => {
  renderComponent({});
  expect(screen.queryByTestId("sort")).not.toHaveClass("border-end");
});

it("should render a default placeholder <option> if sortInfo.sortBy === '' ", () => {
  renderComponent({});
  expect(screen.queryByTestId("sortby-default-option")).toBeInTheDocument();
});

it("should not render the default placeholder <option> if sortInfo.sortBy is an actual field", () => {
  renderComponent({ sortBy: "date" });
  expect(screen.queryByTestId("sortby-default-option")).not.toBeInTheDocument();
});
