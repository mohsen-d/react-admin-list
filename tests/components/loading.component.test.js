/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Loading } from "../../components";

it("should render nothing ", async () => {
  render(<Loading enable={false} />);

  expect(screen.queryByText("Please wait...")).toBeNull();
});

it("should render loading message", async () => {
  render(<Loading enable={true} />);

  expect(screen.queryByText("Please wait...")).toBeDefined();
});
