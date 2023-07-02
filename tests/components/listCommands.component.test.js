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
import { ListCommands } from "../../components";

const [handleAdd, renderForm, handleRemove, handleEdit] = Array(4).fill(
  jest.fn()
);
const options = {
  new: true,
  remove: true,
  edit: true,
  sort: true,
  search: true,
};

function renderComponent({ selectedIds = [] }) {
  return render(
    <HandlersContext.Provider
      value={{ handleAdd, renderForm, handleRemove, handleEdit }}
    >
      <DynamicsContext.Provider value={{ selectedIds }}>
        <StaticsContext.Provider value={{ options }}>
          <ListCommands customCommands={[]} />
        </StaticsContext.Provider>
      </DynamicsContext.Provider>
    </HandlersContext.Provider>
  );
}

it("should hide <add>, <Sort>, <search> commands if there are selected rows", () => {
  renderComponent({ selectedIds: [1] });
  expect(screen.queryByTestId("add-sort-search-commands")).toHaveClass(
    "d-none"
  );
});

it("should hide <remove>, <edit>, <custom> commands if no row is selected", () => {
  renderComponent({ selectedIds: [] });
  expect(screen.queryByTestId("remove-edit-custom-commands")).toHaveClass(
    "d-none"
  );
});
