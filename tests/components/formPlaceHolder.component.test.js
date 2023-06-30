/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  DynamicsContext,
  HandlersContext,
  StaticsContext,
} from "../../context";
import { FormPlaceholder } from "../../components";

function renderComponent({
  formToRender = "",
  currentSize = 100,
  sort = true,
  search = true,
}) {
  return render(
    <HandlersContext.Provider
      value={{ handleSortChange: () => {}, handleNewSearch: () => {} }}
    >
      <DynamicsContext.Provider
        value={{
          currentSize,
          sortInfo: { sortBy: "", sortFields: [] },
        }}
      >
        <StaticsContext.Provider value={{ options: { sort, search } }}>
          <FormPlaceholder formToRender={formToRender} />
        </StaticsContext.Provider>
      </DynamicsContext.Provider>
    </HandlersContext.Provider>
  );
}

describe("sort", () => {
  it("should render <sort> if window width >= 992", async () => {
    renderComponent({ currentSize: 1024 });

    expect(screen.queryByTestId("sort")).toBeInTheDocument();
  });

  it("should render <sort> if formToRender is 'sort'", async () => {
    renderComponent({ formToRender: "sort" });

    expect(screen.queryByTestId("sort")).toBeInTheDocument();
  });

  it("should not render <sort> if options.sort is false", async () => {
    renderComponent({ formToRender: "sort", sort: false });

    expect(screen.queryByTestId("sort")).not.toBeInTheDocument();
  });
});

describe("search", () => {
  it("should render <search> if window width >= 992", async () => {
    renderComponent({ currentSize: 1024 });

    expect(screen.queryByTestId("search")).toBeInTheDocument();
  });

  it("should render <search> if formToRender is 'search'", async () => {
    renderComponent({ formToRender: "search" });

    expect(screen.queryByTestId("search")).toBeInTheDocument();
  });

  it("should not render <search> if options.search is false", async () => {
    renderComponent({ formToRender: "search", search: false });

    expect(screen.queryByTestId("search")).not.toBeInTheDocument();
  });
});

describe("wrapper", () => {
  it("should wrap output in a <div> if window.width >= 992", async () => {
    renderComponent({ currentSize: 1024 });

    expect(screen.queryByTestId("wrapper")).toBeInTheDocument();
  });

  it("should not wrap output in a <div> if window.width < 992", async () => {
    renderComponent({});

    expect(screen.queryByTestId("wrapper")).not.toBeInTheDocument();
  });
});
