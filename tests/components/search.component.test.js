/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  DynamicsContext,
  HandlersContext,
  StaticsContext,
} from "../../context";
import { Search, CurrentSearchInfo } from "../../components";

const handleNewSearch = jest.fn();
const renderForm = jest.fn();

function renderComponent(children, { keyword = "", search = true } = {}) {
  return render(
    <HandlersContext.Provider value={{ handleNewSearch, renderForm }}>
      <DynamicsContext.Provider value={{ searchInfo: { keyword } }}>
        <StaticsContext.Provider value={{ options: { search } }}>
          {children}
        </StaticsContext.Provider>
      </DynamicsContext.Provider>
    </HandlersContext.Provider>
  );
}

describe("search", () => {
  it("should set focus on #searchBox on first render", async () => {
    renderComponent(<Search />);
    expect(screen.queryByTestId("searchBox")).toHaveFocus();
    expect(screen.queryByTestId("searchBox")).toHaveValue("");
  });

  it("should clear the #searchBox and set focus to it if #resetButton is clicked", async () => {
    renderComponent(<Search />);
    const searchBox = screen.queryByTestId("searchBox");
    const resetButton = screen.queryByTestId("resetButton");
    searchBox.value = "keyword";
    expect(searchBox).toHaveValue("keyword");

    fireEvent.click(resetButton);

    expect(searchBox).toHaveFocus();
    expect(searchBox).toHaveValue("");
  });

  it("should call newSearchHandler if Enter is pressed", () => {
    renderComponent(<Search />);
    const searchBox = screen.queryByTestId("searchBox");
    searchBox.value = "keyword";

    expect(searchBox).toHaveValue("keyword");

    fireEvent.keyUp(searchBox, { key: "Enter" });

    expect(handleNewSearch).toHaveBeenCalledWith("keyword");
  });
});

describe("CurrentSearchInfo", () => {
  it("should not render if keyword is empty", async () => {
    renderComponent(<CurrentSearchInfo />);
    expect(screen.queryByTestId("currentSearchInfo")).not.toBeInTheDocument();
  });

  it("should render if keyword is not empty", async () => {
    renderComponent(<CurrentSearchInfo />, { keyword: "keyword" });
    expect(screen.queryByTestId("currentSearchInfo")).toBeInTheDocument();
  });

  it("should not render newSearchButton if options.search = false", async () => {
    renderComponent(<CurrentSearchInfo />, {
      keyword: "keyword",
      search: false,
    });
    expect(screen.queryByTestId("currentSearchInfo")).toBeInTheDocument();
    expect(screen.queryByTestId("newSearchButton")).not.toBeInTheDocument();
  });

  it("should call renderForm if newSearchButton is clicked", () => {
    renderComponent(<CurrentSearchInfo />, {
      keyword: "keyword",
    });

    const newSearchButton = screen.queryByTestId("newSearchButton");

    fireEvent.click(newSearchButton);

    expect(renderForm).toHaveBeenCalledWith("search");
  });

  it("should call handleNewSearch() if #resetButton is clicked", async () => {
    renderComponent(
      <>
        <Search />
        <CurrentSearchInfo />
      </>,
      { keyword: "keyword" }
    );

    const resetButton = screen.queryByTestId("currentSearch-reset-button");

    fireEvent.click(resetButton);

    expect(handleNewSearch).toHaveBeenCalledWith("");
  });
});
