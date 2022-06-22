import {
  getUuid,
  isValid,
  mergeStrings,
  setLoginInfo,
  getLoginInfo,
  getModuleName,
} from "./";
import IEmployee from "../../Interfaces/Employee";
import {
  EMPLOYEE,
  FEEDBACK,
  HOME,
  LOGOUT,
  PERFORMANCE_REVIEW,
} from "../Modules";

describe("src/utility/Common/index.ts", () => {
  beforeEach(() => {});

  describe("getUuid", () => {
    it("Call the getUuid function", () => {
      expect(getUuid).toBeInstanceOf(Function);
      const value = getUuid();
      expect(value).not.toEqual(null);
    });

    it("isValid", () => {
      expect(isValid).toBeInstanceOf(Function);
      const value = isValid("Test");
      expect(value).toEqual(true);
    });

    it("mergeStrings", () => {
      expect(mergeStrings).toBeInstanceOf(Function);
      const value = mergeStrings("FirstName", "LastName");
      expect(value).toEqual("FirstName LastName");
    });

    it("setLoginInfo", () => {
      expect(setLoginInfo).toBeInstanceOf(Function);
      const value = setLoginInfo({} as IEmployee);
      expect(value).toEqual(undefined);
    });

    // Will check this later due to getting the error in the App.test.tsx file.
    it("getLoginInfo", () => {
      expect(getLoginInfo).toBeInstanceOf(Function);
      const value = getLoginInfo();
      expect(value).toEqual({});
    });
    it("getModuleName for Home", () => {
      expect(getModuleName).toBeInstanceOf(Function);
      const value = getModuleName();
      expect(value).toEqual(HOME);
    });
    it("getModuleName for Logout", () => {
      expect(getModuleName).toBeInstanceOf(Function);
      const value = getModuleName("htp://localhost:3000");
      expect(value).toEqual(LOGOUT);
    });
    it("getModuleName for Employee", () => {
      expect(getModuleName).toBeInstanceOf(Function);
      const value = getModuleName("htp://localhost:3000/employee");
      expect(value).toEqual(EMPLOYEE);
    });
    it("getModuleName for Review", () => {
      expect(getModuleName).toBeInstanceOf(Function);
      const value = getModuleName("htp://localhost:3000/review");
      expect(value).toEqual(PERFORMANCE_REVIEW);
    });
    it("getModuleName for Feedback", () => {
      expect(getModuleName).toBeInstanceOf(Function);
      const value = getModuleName("htp://localhost:3000/feedback");
      expect(value).toEqual(FEEDBACK);
    });
  });
});
