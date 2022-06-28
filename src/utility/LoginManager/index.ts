import { ILogin } from "../../Interfaces/Common";
import IEmployee from "../../Interfaces/Employee";
import { setLoginSession } from "../Common";
import FetchAPI from "../FetchAPI";
import history from "../History";

// Get the employee from the JSON server database for the given username and password.
const getEmployeeByCredentials = async (username: string, password: string) =>
  await FetchAPI(`Employees?username=${username}&password=${password}`);

const processLogin = async (loginData: ILogin, setLoginData: Function) => {
  // Get Employee record form the JSON Server Database for the given username and password.
  await getEmployeeByCredentials(loginData.username, loginData.password).then(
    (response: any) => {
      if (response && response.length) {
        const employee = response[0] as IEmployee;
        setLoginSession(employee);
        setLoginData(employee);
        history.push("/");
      }
    }
  );
};
export { getEmployeeByCredentials, processLogin };
