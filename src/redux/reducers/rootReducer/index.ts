import { combineReducers } from "redux";
import { IReducer } from "../../../Interfaces/Common";
import loginReducer from "../loginReducer";

const reducersInfo: IReducer = { login: loginReducer };
const rootReducer = combineReducers(reducersInfo);

export default rootReducer;
