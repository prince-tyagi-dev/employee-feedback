import FetchAPI from "../FetchAPI";

// Get the employee from the JSON server database for the given username and password.
const getEmployeeByCredentials = async (username: string, password: string) =>
  await FetchAPI(`Employees?username=${username}&password=${password}`);

export { getEmployeeByCredentials };
