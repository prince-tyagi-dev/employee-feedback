import { getEmployeeByCredentials, processLogin } from "./";
import FetchAPI from "../../utility/FetchAPI";
import IEmployee from "../../Interfaces/Employee";
import { ILogin } from "../../Interfaces/Common";

jest.mock("../../utility/FetchAPI");

describe("src/utility/LoginManager/index.ts", () => {
  let mockFetch: any;
  let employee: IEmployee;
  let loginData: ILogin;
  let setLoginData: Function;

  beforeEach(() => {
    mockFetch = FetchAPI;
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
    loginData = { username: "username", password: "password" };
    setLoginData = jest.fn();
  });

  describe("getEmployeeByCredentials", () => {
    it("Call the getEmployeeByCredentials function", async () => {
      expect(getEmployeeByCredentials).toBeInstanceOf(Function);
      mockFetch.mockImplementation(() => {
        return Promise.resolve([employee]);
      });
      const value = await getEmployeeByCredentials("username", "password");
      expect(value).not.toEqual(null);
    });
  });
  describe("processLogin", () => {
    it("Call the processLogin function", async () => {
      expect(processLogin).toBeInstanceOf(Function);
      mockFetch.mockImplementation(() => {
        return Promise.resolve([employee]);
      });
      const value = await processLogin(loginData, setLoginData);
      expect(value).not.toEqual(null);
    });
  });
});
