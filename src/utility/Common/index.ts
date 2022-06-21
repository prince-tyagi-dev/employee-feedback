import IEmployee from "../../Interfaces/Employee";
import {
  EMPLOYEE,
  FEEDBACK,
  HOME,
  LOGOUT,
  PERFORMANCE_REVIEW,
} from "../Modules";

// Return a unique number, eg. it can be used as the unique id.
const getUuid = (): number => {
  return new Date().getTime();
};

// Return true if the given value is as valid value means it does not have the null or undefined or the white space.
const isValid = (value: string): boolean => {
  return value !== undefined && value !== null && value.trim().length > 0;
};

// Concatenate the given multiple string with the space, eg. it can be used to concatenate the first name and the last of a user.
const mergeStrings = (...strings: string[]): string => strings.join(" ");

// Set the login information to the Session Storage.
const setLoginInfo = (employee: IEmployee) => {
  sessionStorage.setItem("LOGINUSER", JSON.stringify(employee));
};

// Get the login information from the Session Storage.
const getLoginInfo = (): IEmployee => {
  return JSON.parse(sessionStorage.getItem("LOGINUSER") || "{}");
};

// Get the module name from the requesting url.
const getModuleName = (): string => {
  const url = window.location.href;
  return url.indexOf("employee") !== -1
    ? EMPLOYEE
    : url.indexOf("review") !== -1
    ? PERFORMANCE_REVIEW
    : url.indexOf("feedback") !== -1
    ? FEEDBACK
    : url.indexOf("home") !== -1
    ? HOME
    : LOGOUT;
};

export {
  getUuid,
  isValid,
  mergeStrings,
  setLoginInfo,
  getLoginInfo,
  getModuleName,
};
