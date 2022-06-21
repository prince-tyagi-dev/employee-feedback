import { IAction, IState } from "../../../Interfaces/Common";
import { LOGIN } from "../../types";

const initialState = { user: {} } as IState;

const loginReducer = (state: IState = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...state, user: payload };
    default:
      return { ...state };
  }
};

export default loginReducer;
