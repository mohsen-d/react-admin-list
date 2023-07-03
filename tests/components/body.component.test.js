/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StaticsContext, DynamicsContext } from "../../context";
import { Body } from "../../components";

const columns = [
  { title: "title", field: "title", classes: "" },
  { title: "date", field: "date", classes: "" },
];

function renderComponent({ list = [] }) {
  render(
    <DynamicsContext.Provider
      value={{
        sortInfo: { sortBy: "date", sortDirection: "1" },
        loadingInfo: { isLoading: false },
        searchInfo: { keyword: "" },
      }}
    >
      <StaticsContext.Provider
        value={{ columns, options: { keyField: "_id" }, loadingtdColSpan: 4 }}
      >
        <table>
          <Body list={list} />
        </table>
      </StaticsContext.Provider>
    </DynamicsContext.Provider>
  );
}

describe("body", () => {
  it("should renturn <emptyList> if list==[]", () => {
    renderComponent({});
    expect(screen.queryByTestId("norecords-message")).toBeInTheDocument();
  });

  it("should render only fields specified in columns", () => {
    renderComponent({
      list: [{ _id: 1, title: "t", date: "1/2/2002", author: "mohsen" }],
    });
    expect(screen.queryAllByTestId("normal-row-cell").length).toEqual(2);
  });
});
