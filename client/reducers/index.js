import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sports from "./sports";
import tournaments from "./tournaments";

export default combineReducers({ alert, auth, sports, tournaments });
