import { combineReducers } from "redux";
import { IReducer } from "../../interfaces";
import loginReducer from "../loginReducer";

const state: IReducer = { login: loginReducer };
const rootReducer = combineReducers(state);

export default rootReducer;
