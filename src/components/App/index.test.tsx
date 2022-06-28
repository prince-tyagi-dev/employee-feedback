import { render, screen } from "@testing-library/react";
import App from "./";
import enums from "../../utility/Enums";
import { getLoginSession } from "../../utility/Common/";
import IEmployee from "../../Interfaces/Employee";
jest.mock("../../utility/Common/");

describe("src/components/App/index.tsx", () => {
  let mockgetLoginSession: any;
  let employee: IEmployee;

  beforeEach(() => {
    mockgetLoginSession = getLoginSession;
    employee = {
      id: "1234567",
      firstName: "Prince",
      lastName: "Tyagi",
      age: 31,
      email: "prince@gmail.com",
      username: "admin",
      password: "admin@123",
      review: "",
      feedback: "",
      isAdmin: true,
    };
  });

  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(enums.msg.appHeaderTitle);
    expect(linkElement).toBeInTheDocument();
  });

  describe("setLoginSession", () => {
    it("Login with the Admin", () => {
      expect(mockgetLoginSession).toBeInstanceOf(Function);

      mockgetLoginSession.mockImplementation(() => {
        return employee;
      });
      render(<App />);
      const linkElement = screen.getByText(enums.msg.appHeaderTitle);
      expect(linkElement).toBeInTheDocument();
    });

    it("Login with the Employee", () => {
      expect(mockgetLoginSession).toBeInstanceOf(Function);

      mockgetLoginSession.mockImplementation(() => {
        return { ...employee, isAdmin: false };
      });
      render(<App />);
      const linkElement = screen.getByText(enums.msg.appHeaderTitle);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
