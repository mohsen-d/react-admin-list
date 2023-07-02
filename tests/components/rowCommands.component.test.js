/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HandlersContext, StaticsContext } from "../../context";
import { RowCommands } from "../../components";

const [handleSelection, handleRemove, handleEdit] = Array(4).fill(jest.fn());

function renderComponent({ multipleSelection = true }) {
  return render(
    <HandlersContext.Provider
      value={{ handleSelection, handleRemove, handleEdit }}
    >
      <StaticsContext.Provider value={{ options: { multipleSelection } }}>
        <RowCommands customCommands={{ id: 1 }} />
      </StaticsContext.Provider>
    </HandlersContext.Provider>
  );
}

it("should not render selection checkbox if options.multiSelection == false", () => {
  renderComponent({ multipleSelection: false });
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});
