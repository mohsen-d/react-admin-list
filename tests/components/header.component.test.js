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
import { Header } from "../../components";

const [handleSelectAll, handleSortChange, stickyElmsRef] = Array(3).fill(
  jest.fn()
);
const columns = [
  { title: "title", field: "title", classes: "" },
  { title: "date", field: "date", classes: "" },
];

function renderComponent({ multipleSelection = true, sortBy = "" }) {
  return render(
    <DynamicsContext.Provider
      value={{
        sortInfo: {
          sortDirection: "1",
          sortBy,
          sortFields: [{ field: sortBy, title: sortBy }],
        },
      }}
    >
      <StaticsContext.Provider
        value={{ stickyElmsRef, options: { multipleSelection } }}
      >
        <HandlersContext.Provider value={{ handleSelectAll, handleSortChange }}>
          <table>
            <Header columns={columns} />
          </table>
        </HandlersContext.Provider>
      </StaticsContext.Provider>
    </DynamicsContext.Provider>
  );
}

it("should not render selection checkbox if options.multiSelection == false", () => {
  renderComponent({ multipleSelection: false });
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});

it("should not wrap headercell content in <a> if field is not sortable", () => {
  renderComponent({});
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

it("should wrap headercell content in <a> if field is sortable", () => {
  renderComponent({ sortBy: "date" });
  expect(screen.queryByTestId("sortable-header")).toBeInTheDocument();
  expect(screen.queryByTestId("sortable-header")).toHaveTextContent("date");
});
