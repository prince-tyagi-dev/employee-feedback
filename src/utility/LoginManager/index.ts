import { IKeyValuePair, ILogin } from "../../Interfaces/Common";
import IEmployee from "../../Interfaces/Employee";
import { setLoginInfo } from "../Common";
import FetchAPI from "../FetchAPI";
import history from "../History";

// Get the employee from the JSON server database for the given username and password.
const getEmployeeByCredentials = async (username: string, password: string) =>
  await FetchAPI(`Employees?username=${username}&password=${password}`);

const processLogin = async (props: IKeyValuePair, loginData: ILogin) => {
  // Get Employee record form the JSON Server Database for the given username and password.
  await getEmployeeByCredentials(loginData.username, loginData.password).then(
    (response: any) => {
      if (response && response.length) {
        const employee = response[0] as IEmployee;
        setLoginInfo(employee);

        if (props.loginCallBack) {
          props.loginCallBack({ target: { href: window.location.href } });
        }
        history.push("/");
        window.location.reload();
      }
    }
  );
};
export { getEmployeeByCredentials, processLogin };
