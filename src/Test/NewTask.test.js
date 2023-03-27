import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByRole,
  getAllByLabelText,
  getAllByRole,
} from "@testing-library/react";
import NewTask from "../components/NewTask";

describe("Create New Task component", () => {
  it("should render New Task component correctly", () => {
    render(<NewTask />);
    const element = screen.getByLabelText("Enter Task Name");
    expect(element).toBeInTheDocument();
  });
});
it("should show error message when all the fields are not entered", () => {
  render(<NewTask />);
  const buttonElement = screen.getByTestId("saveTestButton");
  fireEvent.click(buttonElement);
});
