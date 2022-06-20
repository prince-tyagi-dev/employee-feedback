import IEmployee from "../../Interfaces/Employee";

export interface IState {
  user: IEmployee;
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IReducer {
  login: any;
}
export interface IAppProps {
  user: IEmployee;
  saveLoginInfo: Function;
}
