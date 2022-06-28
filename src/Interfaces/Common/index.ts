import IEmployee from "../Employee";

// Redux
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

// Others
export interface IKeyValuePair {
  [key: string]: any;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface ILoginContext {
  loginData: IEmployee;
  setLoginData: Function;
}
