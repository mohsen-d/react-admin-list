/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DynamicsContext } from "../../context";
import { Confirm } from "../../components";

it("should render nothing ", async () => {
  render(<Confirm show={false} />);

  expect(screen.queryByTestId("confirm-modal")).toBeNull();
});

it("should render the confirm modal ", async () => {
  render(<Confirm show={true} />);

  expect(screen.queryByTestId("confirm-modal")).toBeInTheDocument();
});

it("should resize according to window size", async () => {
  const { rerender } = render(
    <DynamicsContext.Provider value={{ currentSize: 1024 }}>
      <Confirm show={true} />
    </DynamicsContext.Provider>
  );

  let modalBox = screen.queryByTestId("confirm-modal-box");
  expect(modalBox).toHaveClass("w-25");

  rerender(
    <DynamicsContext.Provider value={{ currentSize: 768 }}>
      <Confirm show={true} />
    </DynamicsContext.Provider>
  );

  modalBox = screen.queryByTestId("confirm-modal-box");
  expect(modalBox).toHaveClass("w-50");

  rerender(
    <DynamicsContext.Provider value={{ currentSize: 500 }}>
      <Confirm show={true} />
    </DynamicsContext.Provider>
  );

  modalBox = screen.queryByTestId("confirm-modal-box");
  expect(modalBox).toHaveClass("w-75");
});
