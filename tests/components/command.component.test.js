/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DynamicsContext, HandlersContext } from "../../context";
import { Command } from "../../components";

let runHandler;
let handler;

beforeEach(() => {
  jest.clearAllMocks();
  runHandler = jest.fn();
  handler = jest.fn();
});

function renderComponent({
  title = "command",
  icon = "plus",
  listCommand = true,
  needsLoading = true,
  needsConfirm = true,
}) {
  return render(
    <HandlersContext.Provider value={{ runHandler }}>
      <DynamicsContext.Provider value={{ selectedIds: [1] }}>
        <Command
          title={title}
          icon={icon}
          listCommand={listCommand}
          needsConfirm={needsConfirm}
          needsLoading={needsLoading}
          handler={handler}
          className=""
        />
      </DynamicsContext.Provider>
    </HandlersContext.Provider>
  );
}

it("should call runHandler() if needsLoading = true", () => {
  renderComponent({});
  fireEvent.click(screen.getByRole("button"));

  expect(runHandler).toHaveBeenCalled();
});

it("should call handler() if needsLoading = false", () => {
  renderComponent({ needsLoading: false });
  fireEvent.click(screen.getByRole("button"));

  expect(runHandler).not.toHaveBeenCalled();
  expect(handler).toHaveBeenCalled();
});

it("should render icon if it's provided", () => {
  renderComponent({});

  expect(screen.queryByTestId("command-icon")).toBeInTheDocument();
});

it("should render title if icon is not provided", () => {
  renderComponent({ title: "new post", icon: "" });

  expect(screen.queryByTestId("command-icon")).not.toBeInTheDocument();
  expect(screen.queryByText("new post")).toBeInTheDocument();
});

it("should pass selectedIds to handler if listCommand == true", () => {
  renderComponent({});
  fireEvent.click(screen.getByRole("button"));

  expect(runHandler.mock.calls[0][3]).toEqual([1]);
});
