import { IAction, IState } from "../../interfaces";
import { LOGIN } from "../../types";

const initialState = {} as IState;

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
