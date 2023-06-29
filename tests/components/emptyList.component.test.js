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
import { EmptyList } from "../../components";

function renderComponent({ isLoading = false, keyword = "", options = {} }) {
  return render(
    <DynamicsContext.Provider
      value={{
        loadingInfo: { isLoading },
        searchInfo: { keyword },
      }}
    >
      <StaticsContext.Provider value={{ options }}>
        <HandlersContext.Provider value={{ handleAdd: () => {} }}>
          <EmptyList />
        </HandlersContext.Provider>
      </StaticsContext.Provider>
    </DynamicsContext.Provider>
  );
}

it("should render loading message", async () => {
  renderComponent({ isLoading: true });
  expect(screen.queryByTestId("isloading-message")).toBeInTheDocument();
});

it("should render search message", async () => {
  renderComponent({ keyword: "keyword" });
  expect(screen.queryByTestId("isloading-message")).not.toBeInTheDocument();
  expect(screen.queryByTestId("nomatch-message")).toBeInTheDocument();
});

it("should render no records message", async () => {
  renderComponent({});
  expect(screen.queryByTestId("isloading-message")).not.toBeInTheDocument();
  expect(screen.queryByTestId("nomatch-message")).not.toBeInTheDocument();
  expect(screen.queryByTestId("norecords-message")).toBeInTheDocument();
});
