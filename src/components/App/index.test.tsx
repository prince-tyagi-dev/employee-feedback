import { render, screen } from "@testing-library/react";
import App from "./";
import enums from "../../utility/Enums";
import { getLoginInfo } from "../../utility/Common/";
import IEmployee from "../../Interfaces/Employee";
jest.mock("../../utility/Common/");

describe("src/components/App/index.tsx", () => {
  let mockGetLoginInfo: any;
  let employee: IEmployee;

  beforeEach(() => {
    mockGetLoginInfo = getLoginInfo;
    employee = {
      id: "1234567",
      firstName: "Prince",
      lastName: "Tyagi",
      age: 31,
      email: "prince@gmail.com",
      username: "admin",
      password: "admin@123",
      isAdmin: true,
    } as IEmployee;
  });

  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(enums.msg.appHeaderTitle);
    expect(linkElement).toBeInTheDocument();
  });

  describe("setLoginInfo", () => {
    it("Login with the Admin", () => {
      expect(mockGetLoginInfo).toBeInstanceOf(Function);

      mockGetLoginInfo.mockImplementation(() => {
        return employee;
      });
      render(<App />);
      const linkElement = screen.getByText(enums.msg.appHeaderTitle);
      expect(linkElement).toBeInTheDocument();
    });

    it("Login with the Employee", () => {
      expect(mockGetLoginInfo).toBeInstanceOf(Function);

      mockGetLoginInfo.mockImplementation(() => {
        return { ...employee, isAdmin: false };
      });
      render(<App />);
      const linkElement = screen.getByText(enums.msg.appHeaderTitle);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
