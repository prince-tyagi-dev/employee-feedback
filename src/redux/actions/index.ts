import IEmployee from "../../Interfaces/Employee";
import { IAction } from "../../Interfaces/Common";
import { LOGIN } from "../types";

const saveLoginInfo = (payload: IEmployee): IAction => {
  return { type: LOGIN, payload };
};

export { saveLoginInfo };
