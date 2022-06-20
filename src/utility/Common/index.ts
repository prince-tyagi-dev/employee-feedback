import IEmployee from "../../Interfaces/Employee";

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

const setLoginInfo = (employee: IEmployee) => {
  localStorage.setItem("LOGINUSER", JSON.stringify(employee));
};
const getLoginInfo = (): IEmployee => {
  return JSON.parse(localStorage.getItem("LOGINUSER") || "{}");
};

export { getUuid, isValid, mergeStrings, setLoginInfo, getLoginInfo };
