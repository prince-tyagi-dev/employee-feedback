import FetchAPI from "../FetchAPI";

// Get the employee from the JSON server database for the given userName and pasword.
const getEmployeeByCredentials = async (userName: string, password: string) =>
  await FetchAPI(`Employees?userName=${userName}&password=${password}`);

export { getEmployeeByCredentials };
