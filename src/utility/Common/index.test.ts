import { getUuid, isValid, mergeStrings, setLoginSession, getLoginSession } from "./";
import IEmployee from "../../Interfaces/Employee";

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

    it("setLoginSession", () => {
      expect(setLoginSession).toBeInstanceOf(Function);
      const value = setLoginSession({} as IEmployee);
      expect(value).toEqual(undefined);
    });

    // Will check this later due to getting the error in the App.test.tsx file.
    it("getLoginSession", () => {
      expect(getLoginSession).toBeInstanceOf(Function);
      const value = getLoginSession();
      expect(value).toEqual({});
    });
  });
});
