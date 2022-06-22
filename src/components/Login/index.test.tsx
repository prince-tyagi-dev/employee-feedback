import { render, screen } from "@testing-library/react";
import Login from "./";

test("renders learn react link", () => {
  render(<Login />);
  const loginElement = screen.getByText("Login");
  expect(loginElement).toBeInTheDocument();
});
