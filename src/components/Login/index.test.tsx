import { render, screen } from "@testing-library/react";
import Login from "./";

test("Check the Login button on the Login screen", () => {
  render(<Login />);
  const loginElement = screen.getAllByText("Login")[0] as HTMLButtonElement;
  expect(loginElement).toBeInTheDocument();
});
