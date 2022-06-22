import { render, screen } from "@testing-library/react";
import Login from "./";

test("Check the Login button on the Login screen", () => {
  render(<Login />);
  const loginElement = screen.getByText("Login");
  expect(loginElement).toBeInTheDocument();
});
